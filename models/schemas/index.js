const userSchema = require('./user');
// const activationCodesSchema = require('./activationCodes');
// const refreshTokensSchesma = require('./refreshTokens');
const path = require('path');
const fs = require('fs').promises;

async function initSchemas() {
    await userSchema();
    const currentFile = path.relative(__dirname, __filename);
    const files = await fs.readdir(__dirname);

    for (const file of files) {
        if (file === currentFile || file === 'user.js') {
            continue;
        }
        await require(path.join(__dirname, file))();
    }
}

// async function initSchemas() {
//     await userSchema();
//     await activationCodesSchema();
//     await refreshTokensSchema();
// }

module.exports = initSchemas;
