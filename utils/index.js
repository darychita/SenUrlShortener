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

function validateIsEmpty(value, objName) {
    if (isObjectEmpty(value)) {
        throw new Error(`${objName} cannot be empty!`);
    }
}

module.exports = {
    isObjectEmpty,
    randomToken,
    validateIsEmpty
};
