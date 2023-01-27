const model = require("../model/adminUserModel")
const service = require("../service/adminUserService")

const express = require('express');

const router = express.Router();


router.post('/register', async (req, res, next) => {
  try {

    let payload = {}

    if (req.body.name && req.body.email) {

      payload.name = req.body.name
      payload.email = req.body.email

    } else {

      res.status(400).json({
        code: 400,
        message: 'please enter both name and email',
      });

    }

    const findRes = await service.findAdmin({
      email: req.body.email
    })

    if (findRes && findRes.length) {

      res.status(400).json({
        statusCode: 400,
        message: 'email already exists',
        response: findRes
      })

    } else {
      const response = await service.postAdmin(payload)

      res.status(201).json({
        code: 201,
        message: 'registered successfully',
        response: response
      })
    }


  }
  catch (err) {

    // return next(new Error("missing"))

    res.status(500).json({
      statusCode: 500,
      stack: err.stack,
      message: err.message,
    });

  }
})

router.post('/login', async(req, res, next)=>{
  try {

    let payload = {}

    if ( req.body.email) {

      payload.email = req.body.email

    } else {

      res.status(400).json({
        code: 400,
        message: 'please enter the email',
      });

      return

    }


    const findRes = await service.findAdmin({
      email: req.body.email
    })

    if (findRes && findRes.length) {

      res.status(201).json({
        statusCode: 201,
        message: 'login successfull',
        response: findRes
      })

    } else {
      res.status(400).json({
        statusCode: 400,
        message: 'login failed',
      })

      return
    }


  } catch (error) {

    res.status(500).json({
      statusCode: 500,
      stack: error.stack,
      message: error.message,
    });
  }
})


module.exports = router

