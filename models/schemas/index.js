const path = require('path');
const fs = require('fs').promises;
const db = require('../../config/dbConnect');
const userSchema = require('./user');

async function initSchemas() {
    await db.raw('create extension if not exists pgcrypto');
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

module.exports = initSchemas;
