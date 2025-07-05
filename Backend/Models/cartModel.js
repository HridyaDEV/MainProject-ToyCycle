const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        // unique: true, // one cart per user
    },
    items: [
        {
            toyId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Toy",
                required: true,
            },
             quantity: {
      type: Number,
      required: true,
      min: 1,
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
cartSchema.index({ userId: 1 }, { unique: true });

module.exports = mongoose.model("Cart", cartSchema)