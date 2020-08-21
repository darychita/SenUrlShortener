const { Router } = require('express');
const userHandlers = require('./handlers/user');
const authHandlers = require('./handlers/auth');
const {
    registrationValidation,
    loginValidation,
    emailValidation,
    passwordValidation
} = require('../middleware/validations');
const validate = require('../middleware/validateMiddleware');

// eslint-disable-next-line
const router = Router();

router.post('/register', validate(registrationValidation),
                userHandlers.createUser);
router.get('/register/confirm/:code', userHandlers.confirmEmail);
router.post('/reset', validate(emailValidation), userHandlers.resetPassword);
router.get('/reset/:token', userHandlers.confirmResetPassword);
router.post('/reset/:token', validate(passwordValidation),
                userHandlers.confirmResetPassword);

router.post('/login', validate(loginValidation), authHandlers.login);
router.patch('/token/update',authHandlers.updateAccessToken);
router.delete('/logout', authHandlers.logout);

// router.post('/test', (req, res) => res.send('Test post'));
// router.get('/test', authenticate, (req, res) => res.send('This is secure route'));
module.exports = router;
