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

async function getLinks(whereClause, limit, offset) {
    try {
        let query = db(links.tableName)
                    .select('*')
                    .where(whereClause);
        if (limit) {
            query = query.limit(limit).offset(offset * limit);
        }
        query = query.orderBy(links.createdAt, 'desc');
        const result = await query;
        return result.length
                ? limit && limit === 1 ? result[0] : result
                : null;
    } catch (e) {
        return { error: e.message };
    }
}

async function updateLink(uuid, updateSet) {
    try {
        const result = await db(links.tableName)
                        .update(updateSet)
                        .where({ uuid })
                        .returning('*');
        return result.length ? result[0] : null;
    } catch (e) {
        return { error: e.message };
    }
}

async function deleteLink(uuid) {
    try {
        return await db(links.tableName)
                        .delete()
                        .where({ uuid });
    } catch (e) {
        return { error: e.message };
    }
}

async function incrementViews(linkId) {
    try {
        return await db(links.tableName)
                        .where({ id: linkId })
                        .increment(links.views);
    } catch (e) {
        return { error: e.message };
    }
}

async function getLinksAmount(whereClause) {
    try {
        let query = db(links.tableName)
                        .count('*');
        if (whereClause) {
            query = query.where(whereClause);
        }

        const result = await query;
        return result.length ? +result[0].count : 0;
    } catch (e) {
        return { error: e.message };
    }

}
module.exports = {
    createLink,
    getLinks,
    updateLink,
    deleteLink,
    incrementViews,
    getLinksAmount
};
