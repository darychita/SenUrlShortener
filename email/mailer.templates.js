const confirmEmail = (to, code) => ({
    to,
    subject: 'Confirm account email at SenUrlShortener',
    html: `<a href="${process.env.HOST}/register/confirm/${code}">` +
            `Click here to comfirm your acc</a>`
});

module.exports = {
    confirmEmail
};
