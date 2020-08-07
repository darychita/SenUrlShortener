const express = require('express');
const handlers = require('./handlers/user');
const { 
    registrationValidation, 
    emailValidation,
    passwordValidation 
} = require('../middleware/validations');
const validate = require('../middleware/validateMiddleware');

// eslint-disable-next-line
const router = express.Router();


router.post('/register', validate(registrationValidation), handlers.createUser);
router.get('/register/confirm/:code', handlers.confirmEmail);
router.post('/reset', validate(emailValidation), handlers.resetPassword);
router.post('/reset/:token', validate(passwordValidation), handlers.confirmResetPassword);

module.exports = router;
