const service = require("../service/houseService")
const userService = require("../service/userService")

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

    if (req.body.amount) {
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

    if (req?.body?.isCheckOut) {

      payload = {
        users: [],
        startDate: null,
        endDate: null,
        status: "Open"

      }

      const response = await service.bookHouse(houseId, payload)

      res.status(201).json({
        status: 201,
        message: 'House status is reset successfully',
        response
      })

      return

    } else {

      // if (req.body.amount) {
      //   payload.amount = req.body.amount
      // } else {
      //   res.status(400).json({
      //     status: 400,
      //     message: 'Please enter the amount',
      //   });

      //   return
      // }

      // if (req.body.startDate && req.body.endDate) {
      //   payload.startDate = req.body.startDate
      //   payload.endDate = req.body.endDate
      // } else {
      //   res.status(400).json({
      //     status: 400,
      //     message: 'Please enter the start and end dates',
      //   });

      //   return
      // }

      const houseDetails = await service.getHouse(houseId)

      if (!houseDetails) {
        res.status(400).json({
          status: 400,
          message: 'House does not exists',
        });

        return
      }

      if (req.body.users) {

        let finalUserIds = []

        let existingUsers = []


        if (houseDetails && houseDetails.users && houseDetails.users.length) {
          existingUsers = houseDetails.users
        }
        console.log(existingUsers);

        let isUserExists = false

        finalUserIds = req.body.users.map((data, id) => {

          // if (existingUsers && existingUsers.includes(data.id)) {

          //   isUserExists = true

          // }

          return data.id

        })

        if (isUserExists) {

          res.status(400).json({
            status: 400,
            message: `some of the Users selected is already enrolled for this house`,
          });

          return

        }

        payload.users = [...finalUserIds, ...existingUsers]

        if (payload.users && (payload.users.length > houseDetails.amount)) {

          const existingCount = existingUsers.length | 0

          res.status(400).json({
            status: 400,
            message: `space available - ${houseDetails.amount - existingCount} , please select the required users for the available space`,
          });

          return
        }
        if(payload.users && (payload.users.length === houseDetails?.amount)){

          payload.status = "Booked"

        }

        if(req.body.startDate){

          userService.updateStartDates(payload.users, req.body, req.params.id)

        }

      } else {

        res.status(400).json({
          status: 400,
          message: 'Please select the Users',
        });

        return

      }

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

router.delete('/delete/:id', async (req, res, next) => {

  try {

    if (req.params.id) {

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

