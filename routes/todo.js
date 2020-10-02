const express = require('express')
const { getTodos, addTodo, deleteTodo, updateTodo } = require('../controllers/todo')
const auth = require('../middleware/auth')
const router = require('express').Router()



router.get('/gettodos', auth, getTodos)
router.post('/addtodo', auth, addTodo)
router.delete('/deletetodo/:id', auth, deleteTodo)
router.put('/updatetodo/:id', auth, updateTodo)


module.exports = router