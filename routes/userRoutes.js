const express = require('express')
const router = express.Router()
const {
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
} = require('../controllers/userController')

const { protect } = require('../middleware/authMiddleware')

//ROUTE PREFIX = '/api/users'

// ALL GET ROUTES
router.get('/', getUser)
router.get('/user-info/:userId', protect, getSingleUser)
router.get('/inventory/:userId', protect, getUsersInventory)

// ALL POST ROUTES
router.post('/', registerUser)
router.post('/login', loginUser)

// ALL PUT ROUTES
router.put('/update-user-info/:userId', protect, updateUser)
router.put('/update-user-inventory/:userId', protect, updateUserInventory)
router.put(
  '/remove-car-from-inventory/:userId',
  protect,
  removeCarFromInventory
)

// ALL DELETE ROUTES
router.delete('/delete-users-inventory/:userId', protect, deleteInventory)
router.delete('/delete-user/:userId', protect, deleteUser)

module.exports = router
