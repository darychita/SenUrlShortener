const express = require('express');
const handlers = require('./handlers/user');
const { registrationValidation } = require('../middleware/validations');
const validate = require('../middleware/validateMiddleware');

// eslint-disable-next-line
const router = express.Router();


router.post('/register', validate(registrationValidation), handlers.createUser);
router.get('/register/confirm/:code', handlers.confirmEmail);

module.exports = router;
