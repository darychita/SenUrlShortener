const confirmEmailTemplate = (to, code) => ({
    to,
    subject: 'Confirm account email at SenUrlShortener',
    html: `<a href="${process.env.HOST}/register/confirm/${code}">` +
            `Click here to comfirm your acc</a>`
});

const resetPasswordTemplate = (to, token) => ({
    to,
    subject: 'Reset password at SenUrlShortener',
    html: `<a href="${process.env.HOST}/reset/${token}">` +
            `Click here to reset password</a>`
});

module.exports = {
    confirmEmailTemplate,
    resetPasswordTemplate
};
