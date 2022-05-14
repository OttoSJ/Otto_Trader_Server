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
router.get('/cardetails/:id', getOneCar)
router.post('/', protect, setCar)
router.put('/:id', protect, updateCar)
router.delete('/:id', protect, deleteCar)

module.exports = router
