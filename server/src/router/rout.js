const express = require('express');
const { authantication, verifyAdmin } = require('../auth/auth');
const { login, signup, getAll, getSingle, updateUser, deleteUser } = require('../controllers/user');
const router = express.Router();

router.get('/login', login)
router.get('/signup', signup)
router.get('/getall', authantication, getAll)
router.get('/getsingle:id', authantication, getSingle)
router.get('/update:id', authantication, verifyAdmin, updateUser)
router.get('/delete:id', authantication, verifyAdmin, deleteUser)

module.exports = router