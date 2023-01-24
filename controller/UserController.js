const model = require("../model/userModel")
const service = require("../service/userService")

const express = require('express');

const router = express.Router();


router.post('/register', async (req, res, next) => {
  try {

    let payload = {}

    if (req.body.name) {

      payload.name = req.body.name

    } else{

      res.status(400).json({
        message: 'please enter the name',
      });

    }

    const response = service.registerUser(payload)

    res.status(201).json({
      message: 'registered successfully'
    })

  }
  catch (err) {

    res.status(500).json({
      stack: err.stack,
      message: err.message,
    });

  }
})


router.get('/list', async(req, res, next)=>{
  try {

    const response = await service.getUsersList()

    res.status(201).json({
      message: 'success',
      data: response
    })

  } catch (error) {

    res.status(500).json({
      stack: error.stack,
      message: error.message,
    });

  }
})


module.exports = router

