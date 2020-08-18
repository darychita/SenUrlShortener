const db = require('../../config/dbConnect');
const { links } = require('../tables');

async function createLink(link) {
    try {
        return await db(links.tableName)
                        .insert(link)
                        .returning('*');
    } catch (e) {
        return { error: e.message };
    }
}

async function getLinks(whereClause, limit) {
    try {
        let query = db(links.tableName)
                    .select('*')
                    .where(whereClause);
        if (limit) {
            query = query.limit(limit);
        }
        const result = await query;
        return result.length ? limit && limit === 1 ? result[0] : result : null;
    } catch (e) {
        return { error: e.message };
    }
}

async function updateLinks(endpoint, updateSet) {
    try {
        return await db(links.tableName)
                        .update(updateSet)
                        .where({ endpoint });
    } catch (e) {
        return { error: e.message };
    }
}

async function deleteLink(endpoint) {
    try {
        return await db(links.tableName)
                        .delete()
                        .where({ endpoint });
    } catch (e) {
        return { error: e.message };
    }
}

async function incrementViews(linkId) {
    try {
        return await db(links.tableName)
                        .where({ id: linkId })
                        .update({ [links.views]: `${links.views} + 1`});
    } catch (e) {
        return { error: e.message };
    }
}
module.exports = {
    createLink,
    getLinks,
    updateLinks,
    deleteLink,
    incrementViews
};
