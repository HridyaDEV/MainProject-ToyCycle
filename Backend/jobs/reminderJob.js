const cron = require('node-cron')
const Child = require("../Models/childModel")
const User = require("../Models/userModel")
const Vaccine = require("../Models/vaccineModel")
const VaccineStatus = require("../Models/vaccineStatus")
const sendReminderEmail = require("../utils/mailer")

//Runs every day at 9:00 AM
cron.schedule('0 9 * * *', async () => {
    console.log('Running vaccination reminder job');

    const vaccines = await Vaccine.find()
    const children = await Child.find().populate('parentId')

    const today = new Date()

    for (const child of children) {
        const childDOB = new Date(child.dateOfBirth)
        const ageInWeeks = Math.floor((today - childDOB) / (1000 * 60 * 60 * 24 * 7))

        for (const vaccine of vaccines) {

            //Skip gender specific vaccines
            if (vaccine.gender !== 'All' && vaccine.gender !== child.gender) continue;

            //check if child's age matches the vaccine's recommended week
            if (ageInWeeks === vaccine.recommendedWeeks || ageInWeeks + 1 === vaccine.recommendedWeeks) {
                const alreadyReminded = await VaccineStatus.findOne({
                    childId: child._id,
                    vaccineId: vaccine._id,
                })
                if (!alreadyReminded) {
                    const parent = child.parentId

                    const message = `Dear ${parent.userName},\n\nYour child ${child.name} is due for the "${vaccine.name}" vaccine this week.
                                 \n\nPlease consult your pediatrician and ensure timely vaccination. \n\nStay healthy, \nVaccination Reminder System`

                    sendReminderEmail(parent.email, `Vaccination Reminder for ${child.name}`, message)

                    await VaccineStatus.create({
                        childId: child._id,
                        vaccineId: vaccine._id,
                        reminded: true,
                    })
                    console.log(`Reminder sent to ${parent.email} for ${child.name} - ${vaccine.name}`);
                }
            }
        }
    }

})