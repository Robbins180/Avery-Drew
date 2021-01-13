const mongoose = require('mongoose')

const aliceSchema = new mongoose.Schema({
  name: String,
  image: {type: String, default: 'https://via.placeholder.com/150' }
})
// Default image that needs to be changed later

const Alice = mongoose.model('Alice', aliceSchema)

module.exports = Alice
