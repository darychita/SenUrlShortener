const bcrypt = require('bcrypt');
const User = require('../../models/User');
const sendMailer = require('../../email/mailer');
const { confirmEmail: confirmEmailTemplate  } = require('../../email/mailer.templates');
const { randomToken } = require('../../utils');

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
        sendMailer(confirmEmailTemplate(to, code));
        
    } catch (e) {
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

module.exports = {
    createUser,
    confirmEmail
};
