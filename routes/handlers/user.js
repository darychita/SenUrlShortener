const bcrypt = require('bcrypt');
const User = require('../../models/User');
const sendMailer = require('../../email/mailer');
const {
    confirmEmailTemplate,
    resetPasswordTemplate
} = require('../../email/mailer.templates');
const { randomToken } = require('../../utils');
const sendMail = require('../../email/mailer');
const RefreshToken = require('../../models/RefreshToken');
const Link = require('../../models/Link');

const createUser = async (req, res) => {
    const user = new User(req.body);
    const candidate = await User.findUserByEmail(user.email);

    if (candidate) {
        return res.status(409).json({ message: 'Such user already exists!' });
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        user.password = hashedPassword;
        await user.save();

        const code = randomToken(64);
        await user.setActivationCode(code);
        sendMailer(
            confirmEmailTemplate(user.email, code)
        );

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
        user.deleteCodes();
        user.delete();
        return res.status(400).json({
            message: 'Your activation code has expired. Please, register again'
        });
    }
    await user.setActive();
    return res.status(200).json({
        message: 'Your email is successfully confirmed'
    });
};


const resetPassword = async (req, res) => {
    const { email } = req.body;
    const candidate = await User.findUserByEmail(email);

    if (!candidate) {
        return res.status(404).json({ message: 'No such user!' });
    }

    if (!candidate.isActive) {
        return res.status(400).json({
            message: 'Your account is not activated!'
        });
    }

    const code = randomToken(64);
    try {
        await candidate.setPasswordResetToken(code);
    } catch (e) {
        return res.status(409).json({ message: e.message});
    }
    sendMail(resetPasswordTemplate(candidate.email, code));
    return res.status(200).json({
        message: 'Check instructions on your email.'
    });
};

const updatePassword = async (req, candidate) => {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    return await candidate.updatePassword(hashedPassword);
};

const confirmResetPassword = async (req, res) => {
    const { token } = req.params;
    const result = await User.findUserByResetPassword(token);
    if (!result) {
        return res.status(404).json({
            message: 'No user found by such token!'
        });
    }
    const [ candidate, expiresAt ] = result;

    const expires = new Date(expiresAt).getTime();
    if (expires < Date.now()) {
        candidate.deleteCodes();
        return res.status(401).json({
            message: 'Your reset password token has expired.'
        });
    }

    if (req.method === 'GET') {
        return res.status(200).send();
    }

    await updatePassword(req, candidate);

    candidate.deleteCodes();
    return res.status(200).json({ message: 'Your password is updated. '});
};

const updatePasswordAuthenticated = async (req, res) => {
    const candidate = await User.findUserById(req.userId);
    await updatePassword(req, candidate);
    return res.status(200).json({ message: 'Your password is updated. '});
};

const deleteUser = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        return res.status(400).json({ message: 'Provide refresh token' });
    }
    const rt = new RefreshToken(refreshToken);
    await rt.delete();
    let candidate = await User.findUserById(req.userId);
    candidate = await candidate.delete();
    if (!candidate) {
        return res.status(204).send();
    }
    return res.status(500).json({ message: 'Oops, something went wrong'});
};

const getUserLinks = async (req, res) => {
    console.log('LINKS LIST');
    const { userId } = req;
    const { per_page, page } = req.query;
    try {
        const links = await Link.getLinksByUserId(userId, +per_page, +page);
        const amount = await Link.getAmountOfLinksInUser(userId);
        if (!links) {
            return res.status(404).json({
                message: 'No links found.'
            });
        }
        links.forEach((link) => {
            delete link.id;
            delete link.password;
            link.endpoint = `${process.env.HOST}/t/${link.endpoint}`;
        });
        return res.json({
            page: +page,
            perPage: +per_page,
            amount,
            links: links.length ? links : null
        });
    } catch (e) {
        return res.status(500).json({ message: 'Oops, something went wrong'});
    }
};

module.exports = {
    createUser,
    confirmEmail,
    resetPassword,
    confirmResetPassword,
    updatePasswordAuthenticated,
    deleteUser,
    getUserLinks
};
