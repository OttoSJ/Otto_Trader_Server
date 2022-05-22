const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    prefix: {
      type: String,
      required: false,
      default: '',
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    firstname: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 50,
    },
    lastname: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    vehicleinventory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: false,
      },
    ],
    favorites: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: false },
    ],
    privleges: {
      type: String,
      required: false,
      default: 'buyer',
    },
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

module.exports = User
