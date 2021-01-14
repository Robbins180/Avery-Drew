const express = require('express')
const alice = express.Router()
const Alice = require('../models/alice.js')

// Read
  alice.get('/', (req,res) => {
    Alice.find({}, (error, foundAlice) => {
      res.json(foundAlice)
    })
  })
// Create
  alice.post('/', (req,res) => {
    Alice.create(req.body, (error, createdAlice) => {
      Alice.find({}, (error, foundAlice) => {
        res.json(foundAlice)
      })
    })
  })

  //Update
  alice.put('/:id', (req, res) => {
    Alice.findByIdAndUpdate(
      req.params.id, req.body, { new: true },
      (err, updatedAlice) => {
        if (err) { res.send(err) } else {
          Alice.find({}, (err, foundAlice) => {
            res.json(foundAlice)
          })
        }
      }
    )
  })

// Delete
  alice.delete('/:id', (req, res) => {
    Alice.findByIdAndRemove(req.params.id, (err, deletedAlice) => {
      Alice.find({}, (err, foundAlice) => {
        res.json(foundAlice)
      })
    })
  })


module.exports = alice
