const db = require('../../config/dbConnect');
const { refreshTokens } = require('../tables');

async function createRefreshToken(token) {
    try {
        return await db(refreshTokens.tableName)
                    .insert({ [refreshTokens.token]: token });
    } catch (e) {
        return { error: e };
    }
}

async function isTokenExists(token) {
    try {
        const entry = await db(refreshTokens.tableName)
                                .select('*')
                                .where({ [refreshTokens.token]: token });
        return !!entry.length;
    } catch (e) {
        return { error: e };
    }
}

async function deleteToken(token) {
    try {
        return await db(refreshTokens.tableName)
                        .delete()
                        .where({ [refreshTokens.token]: token });
    } catch (e) {
        console.log(e);
        return { error: e };
    }
}

module.exports = {
    createRefreshToken,
    isTokenExists,
    deleteToken
};
