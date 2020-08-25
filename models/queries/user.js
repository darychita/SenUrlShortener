const db = require('../../config/dbConnect');
const { users } = require('../tables');
const { isObjectEmpty } = require('../../utils');

async function createUser(user) { // user { username, email, password }
    try {
        delete user.id;
        const result = await db(users.tableName).insert(user).returning('*');
        return result.length != 0 ? result[0] : null;
    } catch (e) {
        return {
            error: true,
            message: e.message
        };
    }
}

async function updateUser(userId, updateSet) {
    if (isObjectEmpty(updateSet)) {
        throw new Error(`Update set for user ${userId} cannot be empty!`);
    }

    try {
        return await db(users.tableName)
                        .update(updateSet)
                        .where({
                            [users.id]: userId
                        });
    } catch (e) {
        console.log(e);
        return {
            error: true,
            message: e.message
        };
    }
}

async function getUser(whereClause) {
    if (isObjectEmpty(whereClause)) {
        throw new Error(`Where clause set cannot be empty!`);
    }

    try {
        return await db(users.tableName)
                        .select('*')
                        .where(whereClause);
    } catch (e) {
        console.log(e);
        return {
            error: true,
            message: e.message
        };
    }
}

async function deleteUser(id) {
    try {
        return await db(users.tableName)
                        .delete()
                        .where({ id });
    } catch (e) {
        console.log(e);
        return {
            error: true,
            message: e.message
        };
    }
}

module.exports = {
    createUser,
    updateUser,
    getUser,
    deleteUser
};
