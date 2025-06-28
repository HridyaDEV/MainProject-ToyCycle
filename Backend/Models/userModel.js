const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Toy" }]
  },
  {
    timestamps: true 
  }
)

module.exports = mongoose.model("User", UserSchema)
