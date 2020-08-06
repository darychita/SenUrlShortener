const db = require('../../config/dbConnect');
const { users, activationCodes } = require('../tables');

async function createActivationCode(userId, code) {
    const expires = new Date(Date.now() + (24 * 60 * 60 * 1000))
                                .toISOString();
    try {
        return await db(activationCodes.tableName)
                    .insert({
                        [activationCodes.code]: code,
                        [activationCodes.userId]: userId,
                        [activationCodes.expiresAt]: expires
                    });
    } catch (e) {
        return { error: e };
    }
}

async function findByActivationCode(code) {
    try {
        const result = await db(activationCodes.tableName)
                        .select('*')
                        .innerJoin(
                            users.tableName, // TODO: refactor inner join
                            `${users.tableName}.${users.id}`,
                            '=',
                            `${activationCodes.tableName}.${activationCodes.id}`
                        )
                        .where({[`${activationCodes.code}`]: code});
        return result[0] || null;
    } catch (e) {
        return { error: e };
    }
}

async function deleteActivationCode(userId) {
    try {
        return await db(activationCodes.tableName)
                        .delete()
                        .where({
                            [activationCodes.userId]: userId
                        });
    } catch (e) {
        return { error: e };
    }
}
module.exports = {
    createActivationCode,
    deleteActivationCode,
    findByActivationCode
};
