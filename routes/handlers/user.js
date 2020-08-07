const bcrypt = require('bcrypt');
const User = require('../../models/User');
const sendMailer = require('../../email/mailer');
const { confirmEmailTemplate, resetPasswordTemplate } = require('../../email/mailer.templates');
const { randomToken } = require('../../utils');
const sendMail = require('../../email/mailer');

const createUser = async (req, res) => {
    const user = new User(req.body);
    const candidate = await User.findUserByEmail(user.email);

    if (candidate) {
        return res.status(409).json({ message: 'Such user already exists!' });
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 15);
        user.password = hashedPassword;
        await user.save();

        const code = randomToken(64);
        await user.setActivationCode(code);
        sendMailer(
            confirmEmailTemplate(user.email, code)
        );
        
    } catch (e) {
        console.log(e);
        return res.status(500).json(
            { message: 'Oops, something went wrong. Please, try again.'}
        );
    }
    return res.status(201).send();
};


const confirmEmail = async (req, res) => {
    const { code } = req.params;
    const result = await User.findUserByActivationCode(code);
    if (!result) {
        return res.status(404).json({
            message: 'Such activation code doesn\'t exists!'
        });
    }

    const [ user, expiresAt ] = result;
    const timestamp = new Date(expiresAt).getTime();
    if (timestamp < Date.now()) {
        return res.status(400).json({
            message: 'Your activation code has expired. Please, register again'
        });
    }
    await user.setActive();
    return res.status(200).json({ message: 'Your email is successfully confirmed' });
};

const resetPassword = async (req, res) => {
    const { email } = req.body;
    const candidate = await User.findUserByEmail(email);

    if(!candidate) {
        return res.status(404).json({ message: 'No such user!' });
    }

    if(!candidate.isActive) {
        return res.status(400).json({ message: 'Your account is not activated!' });
    }

    const code = randomToken(64);
    await candidate.setPasswordResetToken(code);
    sendMail(resetPasswordTemplate(candidate.email, code));
    return res.status(200).json({ message: 'Check instructions on your email.' });
};

const confirmResetPassword = async (req, res) => {
    const { token } = req.params;
    const result = await User.findUserByResetPassword(token);
    if (!result) {
        return res.status(404).json({ message: 'No user found by such token!' });
    }
    const [ candidate, expiresAt ] = result;

    const expires = new Date(expiresAt).getTime();
    if (expires < Date.now()) {
        return res.status(401).json({ message: 'Your reset password token expired.' });
    }

    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 15);
    await candidate.updatePassword(hashedPassword);
    candidate.deleteCodes();
    return res.status(200).json({ message: 'Your password is updated. '});
};

module.exports = {
    createUser,
    confirmEmail,
    resetPassword,
    confirmResetPassword
};
