const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Car = require('../models/carModel')
const { findById } = require('../models/userModel')

// ALL GET REQUEST //////////////////////////////////////

// GET - GET SINGLE USER FUNCTION
const getSingleUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select([
      '-password',
      '-_id',
      '-vehicleinventory',
    ])

    if (!user) {
      res.status(401)
      throw new Error('User not Authorized')
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(404).json({ message: error })
  }
})

// GET - GET ALL USERS FUNCTION
const getUser = asyncHandler(async (req, res) => {
  try {
    const allUsers = await User.find().select([
      '-password',
      '-address',
      '-city',
      '-state',
      '-zip',
    ])
    res.status(200).json(allUsers)
  } catch (error) {
    res.status(404).json({ message: error })
  }
})

// GET - GET USRES INVENTORY
const getUsersInventory = asyncHandler(async (req, res) => {
  try {
    const checkUser = await User.findById(req.params.userId)
    if (!checkUser) {
      res.status(401)
      throw new Error('User not Authorized')
    }
    const user = await User.findById(req.params.userId)
      .populate([{ path: 'vehicleinventory', model: 'Car' }])
      .select('-password')
    res.status(200).json(user)
  } catch (error) {
    res.status(404).json({ message: error })
  }
})

// ALL POST REQUEST ////////////////////////////////////

// POST - REGISTER USER FUNCTION
const registerUser = asyncHandler(async (req, res) => {
  const {
    username,
    password,
    email,
    firstname,
    lastname,
    address,
    city,
    state,
    zip,
  } = req.body

  if (
    !username ||
    !password ||
    !email ||
    !firstname ||
    !lastname ||
    !address ||
    !city ||
    !state ||
    !zip
  ) {
    res.status(400)
    throw new Error('Please add all fields!')
  }

  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  try {
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      firstname,
      lastname,
      address,
      city,
      state,
      zip,
    })

    if (newUser) {
      res.status(201).json({
        _id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        token: generateToken(newUser._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  } catch (error) {
    res.status(405).json({ message: error })
  }
})

// POST - LOGIN USER FUNCTION
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400)
    throw new Error('Please enter your email and password')
  }

  const newUser = await User.findOne({ email })

  try {
    if (newUser && (await bcrypt.compare(password, newUser.password))) {
      res.json({
        _id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        token: generateToken(newUser._id),
      })
    } else {
      res.status(400)
      throw new Error('Invalid credentials')
    }
  } catch (error) {
    res.status(401).json({ message: error })
  }
})

// ALL PUT REQUEST ////////////////////////////////////

// PUT - UPDATE USER FUNCTION
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId).select('-password')
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  try {
    const updateUserInfo = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    ).select('-password')

    res.status(200).json(updateUserInfo)
  } catch (error) {
    res.status(401).json({
      message: error,
    })
  }
})

const updateUserInventory = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId)
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }

  try {
    const updateUserInfo = await User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $addToSet: req.body }
    ).select('-password')

    res.status(200).json(updateUserInfo)
  } catch (error) {
    res.status(401).json({
      message: error,
    })
  }
})

const removeCarFromInventory = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.body.userId },
      {
        $pull: {
          vehicleinventory: req.body.carId,
          favorites: req.body.likedCarId,
        },
      },
      { multi: true }
    ).select('-password')

    res.status(200).json(user)
  } catch (error) {
    console.log(error)
    res.status(401).json({ message: error })
  }
})

// ALL DELETE REQUEST //////////////////////////////////
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId).select('-password')
  if (!user) {
    res.status(404)
    throw new Error('User not found')
  }
  try {
    user.deleteOne()
    res.status(200).json({ Deleted: user })
  } catch (error) {
    res.status(401).json({ message: error })
  }
})

const deleteInventory = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select([
      '-username',
      '-email',
      '-firstname',
      '-lastname',
      '-password',
      '-address',
      '-city',
      '-state',
      '-zip',
    ])

    if (!user) {
      res.status(401)
      throw new Error('User not authorized')
    }
    const car = await Car.deleteMany({ _id: { $in: user.vehicleinventory } })
    res.status(200).json({ 'Deleted Inventory': user.vehicleinventory })
  } catch (error) {
    res.status(400).json({ message: error })
  }
})

// UTILITY FUNCTIONS FOR ROUTES /////////////////////////
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getUser,
  getSingleUser,
  getUsersInventory,
  updateUser,
  updateUserInventory,
  removeCarFromInventory,
  deleteUser,
  deleteInventory,
}
