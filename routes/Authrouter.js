const express = require('express');
const { loginController, signupController } = require('../controllers/Authcontroller');
const { signupValidation, loginValidation } = require('../validators/Authvalidator');

const router = express.Router();


router.post('/login', loginValidation, loginController);
router.post('/signup', signupValidation, signupController);


module.exports = router;
