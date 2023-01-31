const model = require("../model/userModel")
const service = require("../service/userService")

const express = require('express');

const router = express.Router();


router.post('/register', async (req, res, next) => {
  try {

    let payload = {}

    if (req.body.name) {

      payload.name = req.body.name

    } else {

      res.status(400).json({
        statusCode: 400,
        message: 'please enter the name',
      });

      return

    }

    // if (req.body.amount) {

    //   payload.amount = req.body.amount

    // } else {

    //   res.status(400).json({
    //     statusCode: 400,
    //     message: 'please enter the amount',
    //   });

    //   return

    // }

    const response = await service.registerUser(payload)

    res.status(201).json({
      statusCode: 200,
      message: 'registered successfully',
      response
    })

  }
  catch (err) {

    res.status(500).json({
      statusCode: 500,
      stack: err.stack,
      message: err.message,
    });

  }
})


router.get('/list', async (req, res, next) => {
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

router.delete('/delete/:id', async (req, res, next) => {

  try {

    if (req.params.id) {

      const response = await service.removeUser(req.params.id)

      res.status(201).json({
        message: 'success',
        data: response
      })

    }

  } catch (error) {

    res.status(500).json({
      stack: error.stack,
      message: error.message,
    });

  }

})


module.exports = router

