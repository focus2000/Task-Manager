const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
connectDB()

const app = express()

//routes
const userRoutes = require('./routes/user');
const todoRoutes = require('./routes/todo')

//Middlewares
app.use(express.json())
app.use(cors())
app.use('/api', userRoutes)
app.use('/api', todoRoutes)


const PORT = process.env.PORT|| 5000;
app.listen(PORT, () => console.log(`This server is Running on port ${PORT}`))
