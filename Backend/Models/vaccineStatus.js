const mongoose= require("mongoose")

const vaccineStatusShema = new mongoose.Schema({
    childId:{
        type : mongoose.Schema.Types.ObjectId,
        ref: "Child",
        required : true
    },
    vaccineId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Vaccine",
        required: true
    },
    reminded:{
        type:Boolean, default:false
    },
    remindedOn:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("vaccineStatus", vaccineStatusShema)