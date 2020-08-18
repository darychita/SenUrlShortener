const db = require('../../config/dbConnect');
const { links, users } = require('../tables');

async function createLinksTable() {
    const tableExists = await db.schema.hasTable(links.tableName);
    if (!tableExists) {
        return db.schema.createTable(links.tableName, (table) => {
            table.increments(links.id).primary();
            table
                .integer(links.ownerId)
                .references(users.id)
                .inTable(users.tableName);
            table
                .integer(links.views)
                .defaultTo(0);
            table
                .text(links.origin)
                .notNullable(),
            table
                .string(links.endpoint)
                .notNullable()
                .unique(),
            table
                .timestamp(links.createdAt)
                .notNullable()
                .defaultTo(db.fn.now());
            table
                .boolean(links.isProtected)
                .notNullable()
                .defaultTo(false);
            table.text(links.password);
            table.text(links.description);
        });
    }
}

module.exports = createLinksTable;
