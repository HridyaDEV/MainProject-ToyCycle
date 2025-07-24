const User = require("../Models/userModel")
const Toy = require("../Models/toyModel")
const Child = require("../Models/childModel")
const Vaccine = require("../Models/vaccineModel")

exports.getDashboardCounts = async (req, res) => {
    try {
        const userCount = await User.countDocuments()
        const toyCount = await Toy.countDocuments()
        const childCount = await Child.countDocuments()
        const vaccineCount = await Vaccine.countDocuments()

        res.status(200).json({
            success: true,
            data: {
                users: userCount,
                toys: toyCount,
                children: childCount,
                vaccine: vaccineCount,
            }
        })

    } catch (error) {
        console.error("Dashboard Count Error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch Counts" })

    }
}