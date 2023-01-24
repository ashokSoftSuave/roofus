const express = require('express');
const adminUserController =  require('./controller/adminUserController')

const router = express.Router();

// router.use('/users', authController);
router.use('/register', adminUserController)

router.all("*", (req, res, next) => {

  res.status(404).json({
    message: `cannot find ${req.originalUrl} is not found in this server`,
  })
});

module.exports = router;
