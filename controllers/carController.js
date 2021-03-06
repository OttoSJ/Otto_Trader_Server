const asyncHandler = require('express-async-handler')

const Car = require('../models/carModel')
const User = require('../models/userModel')

const getCars = asyncHandler(async (req, res) => {
  try {
    const cars = await Car.find({ listVehicle: true })
    res.status(200).json(cars)
  } catch (error) {
    res.status(400).json({ message: error })
  }
})

const getOneCar = asyncHandler(async (req, res) => {
  try {
    const foundCar = await Car.findById(req.params.carId)
    if (!foundCar) {
      res.status(400)
      throw new Error('Car not found')
    }

    res.status(200).json(foundCar)
  } catch (error) {
    res.status(400).json({ message: error })
  }
})

const setCar = asyncHandler(async (req, res) => {
  const {
    make,
    model,
    brand,
    year,
    type,
    listprice,
    color,
    drivetype,
    engine,
    transmission,
    comments,
    image,
    mileage,
    ac,
    leatherseats,
    sunroof,
    bluetooth,
    cruisecontrol,
    satradio,
    auxport,
    amfm,
  } = req.body

  if (!make || !model || !year || !type || !listprice || !color || !mileage) {
    res.status(400)
    throw new Error('Please add all fields')
  }
  try {
    const car = await Car.create({
      make,
      model,

      year,
      type,
      listprice,
      color,
      drivetype,
      engine,
      transmission,
      comments,
      image,
      mileage,
      ac,
      leatherseats,
      sunroof,
      bluetooth,
      cruisecontrol,
      satradio,
      auxport,
      amfm,
      user: req.user.id,
    })

    res.status(200).json(car)
  } catch (error) {
    res.status(400).json({ message: error })
  }
})

const updateCar = asyncHandler(async (req, res) => {
  try {
    const car = await Car.findById(req.params.carId)
    if (!car) {
      res.status(400)
      throw new Error('Car not found')
    }

    if (!req.user) {
      res.status(401)
      throw new Error('User not found')
    }

    if (car.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('User not authorized')
    }

    const updatedCar = await Car.findByIdAndUpdate(req.params.carId, req.body, {
      new: true,
    })

    res.status(200).json(updatedCar)
  } catch (error) {
    res.status(400).json({ message: error })
  }
})

const deleteCar = asyncHandler(async (req, res) => {
  try {
    const car = await Car.findById(req.params.carId)

    if (!car) {
      res.status(400)
      throw new Error('Car not found')
    }

    if (!req.user) {
      res.status(401)
      throw new Error('User not found')
    }

    if (car.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('User not authorized')
    }

    await car.remove()

    res.status(200).json({ id: req.params.carId })
  } catch (error) {
    res.status(400).json({ message: error })
  }
})

module.exports = {
  getCars,
  getOneCar,
  updateCar,
  setCar,
  deleteCar,
}
