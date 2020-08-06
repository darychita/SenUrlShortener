const { randomBytes } = require('crypto');

function isObjectEmpty(obj) {
    if (typeof obj !== 'object') {
        return true;
    }
    return Object.keys(obj).length === 0;
}


function randomToken(size) {
    return randomBytes(size).toString('hex');
}

module.exports = {
    isObjectEmpty,
    randomToken
};
