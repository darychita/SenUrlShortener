const { check } = require('express-validator');

const emailValidation = [
    check('email', 'Email is missing')
        .exists()
        .isEmail()
        .withMessage('Please, provide correct email!')
];

const passwordValidation = [
    check('password', 'Password is required')
        .exists()
        .isLength({ min: 7 })
        .matches(/.*[0-9].*/) // contains at least one number
        .withMessage(
            'The password must be 7+ chars long and contain at least one number'
        )
];

const loginValidation = [
    ...emailValidation,
    ...passwordValidation
];

const registrationValidation = [
    ...loginValidation,
    check('username', 'Username is required')
        .exists()
        .isLength({ min: 6 })
        .withMessage('The username must be 6+ chars long')
        .matches(/^[A-Za-z0-9]+$/ ) // contains only letters and numbers
        .withMessage('The username must contain only letters and digits.')
];


module.exports = {
    emailValidation,
    passwordValidation,
    registrationValidation,
    loginValidation
};
