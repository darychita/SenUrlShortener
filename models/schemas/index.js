const userSchema = require('./user');
const activationCodesSchema = require('./activationCodes');
// const path = require('path');
// const fs = require('fs').promises;

// async function initSchemas() {
//     const currentFile = path.relative(__dirname, __filename);
//     const files = await fs.readdir(__dirname);

//     for (const file of files) {
//         if (file === currentFile) {
//             continue;
//         }
//         await require(path.join(__dirname, file))();
//     }
// }

async function initSchemas() {
    await userSchema();
    await activationCodesSchema();
}

module.exports = initSchemas;
