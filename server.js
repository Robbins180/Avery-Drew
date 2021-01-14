//===============
//  DEPENDENCIES
//===============
const express = require('express')
const app = express()
const mongoose = require('mongoose')



//=================
//  MIDDLEWARE
//=================
app.use(express.json())
app.use(express.static('public'))



// ==================
//  CONFIG
// ==================
require('dotenv').config()
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

// ===============
//  ERRORS + YES
// ===============

mongoose.connection.on('error', err =>
  console.log(
    err.message,
    ' is Mongod not running?/Problem with Atlas Connection?'
  )
)
mongoose.connection.on('connected', () =>
  console.log('mongo connected: ', MONGODB_URI)
)
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

// =================
//  CONTROLLER
// =================

const aliceController = require('./controllers/alice_controllers.js')
app.use('/alice', aliceController)

//==================
//  LISTENER
//==================
app.listen(PORT, () => {
console.log( '🍒🍋Listening on port🥝🍉:', PORT)
});
