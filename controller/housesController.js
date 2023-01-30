const service = require("../service/houseService")

const express = require('express');

const router = express.Router();

router.post('/add', async (req, res, next) => {
  try {
    let payload = {}

    if (req.body.name && req.body.propertyId) {

      payload.name = req.body.name
      payload.propertyId = req.body.propertyId

    } else {

      res.status(400).json({
        message: 'please enter both name and property',
      });

      return

    }

    if(req.body.amount){
      payload.amount = req.body.amount
    } else {

      res.status(400).json({
        statusCode: 400,
        message: 'please enter the amount'
      });

      return

    }

    const response = await service.addHouse(payload)

    res.status(201).json({
      statusCode: 201,
      message: 'House added successfully',
      response
    })
  }
  catch (err) {
    res.status(500).json({
      stack: err.stack,
      message: err.message,
    });

  }
})

router.get('/list', async (req, res, next) => {
  try {

    const response = await service.getHouseList()

    res.status(201).json({
      status: 201,
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

router.put('/book/:id', async (req, res, next) => {
  try {

    const houseId = req.params.id
    let payload = {}

    if (req.body.amount) {
      payload.amount = req.body.amount
    } else {
      res.status(400).json({
        message: 'Please enter the amount',
      });
    }

    if (req.body.startDate && req.body.endDate) {
      payload.startDate = req.body.startDate
      payload.endDate = req.body.endDate
    } else {
      res.status(400).json({
        message: 'Please enter the start and end dates',
      });
    }

    if(req.body.userId){
      payload.userId = req.body.userId
    }

    if(req?.body?.isCheckOut){

      payload = {
        userId: null,
        startDate: null,
        endDate: null,
        amount: null,
        status: "Open"

      }

    } else {
      payload.status = "Booked"
    }

    const response = await service.bookHouse(houseId, payload)

    res.status(201).json({
      status: 201,
      message: 'House booked',
      response
    })

  } catch (error) {

    res.status(500).json({
      stack: error.stack,
      message: error.message,
    });

  }
})

router.delete('/delete/:id', async(req, res, next)=>{

  try {

    if (req.params.id){

      const response = await service.removeHouse(req.params.id)

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

