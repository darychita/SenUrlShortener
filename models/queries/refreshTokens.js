const db = require('../../config/dbConnect');
const { refreshTokens } = require('../tables');

const createRefreshToken = async (token) => {
    try {
        return await db(refreshTokens.tableName)
                    .insert({ [refreshTokens.token]: token });
    } catch(e) {
        return { error: e };
    }
};

const isTokenExists = async (token) => {
    try {
        const entry = await db(refreshTokens.tableName)
                                .select('*')
                                .where({ [refreshTokens.token]: token });
        return !!entry.length;
    } catch(e) {
        return { error: e };
    }
};

const deleteToken = async (token) => {
    try {
        return await db(refreshTokens.tableName)
                        .delete()
                        .where({ [refreshTokens.token]: token });
    } catch(e) {
        return { error: e };
    }
};

module.exports = {
    createRefreshToken,
    isTokenExists,
    deleteToken
};
