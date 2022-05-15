const express = require('express')
const router = express.Router()
const {
  getCars,
  getOneCar,
  updateCar,
  setCar,
  deleteCar,
} = require('../controllers/carController')

const { protect } = require('../middleware/authMiddleware')

// ROUTE PREFIX = "/api/inventory"

router.get('/', getCars)
router.get('/cardetails/:carId', getOneCar)
router.post('/', protect, setCar)
router.put('/:carId', protect, updateCar)
router.delete('/:carId', protect, deleteCar)

module.exports = router
