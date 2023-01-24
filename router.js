const express = require('express');
const adminUserController =  require('./controller/adminUserController')
const housesController = require('./controller/housesController')
const userController = require('./controller/UserController')

const router = express.Router();

// router.use('/users', authController);
router.use('/admin', adminUserController)
router.use('/houses', housesController)
router.use('/user', userController)

router.all("*", (req, res, next) => {

  res.status(404).json({
    message: `cannot find ${req.originalUrl} is not found in this server`,
  })
});

module.exports = router;
