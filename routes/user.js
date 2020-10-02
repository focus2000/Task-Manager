const express = require('express')
const router = require('express').Router()
const auth = require('../middleware/auth')
const {signup, login, getUser, changePassword, requestForgotPassword, forgotPassword} = require('../controllers/user')


//Routes
router.get('/auth', auth, getUser)
router.post('/signup', signup);
router.post("/login", login);
router.put("/changePassword", auth, changePassword);
router.post("/requestForgotpassword", requestForgotPassword);
router.post("/forgotPassword/:token", forgotPassword);


module.exports = router