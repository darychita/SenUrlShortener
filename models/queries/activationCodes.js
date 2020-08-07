const db = require('../../config/dbConnect');
const { users, activationCodes } = require('../tables');

async function createActivationCode(userId, code, codeType, expires) {
    const expiration = new Date(Date.now() + expires)
                                .toISOString();
    try {
        return await db(activationCodes.tableName)
                    .insert({
                        [activationCodes.code]: code,
                        [activationCodes.userId]: userId,
                        [activationCodes.expiresAt]: expiration,
                        [activationCodes.type]: codeType
                    });
    } catch (e) {
        console.log(e);
        return { error: e };
    }
}

async function findByActivationCode(code, codeType) {
    try {
        const query = db(activationCodes.tableName)
                        .select('*')
                        .innerJoin(
                            users.tableName, // TODO: refactor inner join
                            `${users.tableName}.${users.id}`,
                            '=',
                            `${activationCodes.tableName}.${activationCodes.userId}`
                        )
                        .where({
                            [`${activationCodes.code}`]: code,
                            [activationCodes.type]: codeType
                        });
        const result = await query;
        return result[0] || null;
    } catch (e) {
        console.log(e);
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
        console.log(e);
        return { error: e };
    }
}
module.exports = {
    createActivationCode,
    deleteActivationCode,
    findByActivationCode
};
