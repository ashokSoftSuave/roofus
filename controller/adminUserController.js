const model = require("../model/adminUserModel")
const service = require("../service/adminUserService")

const express = require('express');

const router = express.Router();


router.post('/', async (req, res, next) => {
  try {

    let payload = {}

    if (req.body.name && req.body.email) {

      payload.name = req.body.name
      payload.email = req.body.email

    }

    const response = service.postAdmin(payload)

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


module.exports = router

