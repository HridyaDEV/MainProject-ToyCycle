const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true, // one cart per user
    },
    items: [
        {
            toyId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Toy",
                required: true,
            },
            addedAt: {
                type: Date,
                default: Date.now,
            }
        }
    ]
}, {
    timestamps: true
})

module.exports = mongoose.model("Cart", cartSchema)