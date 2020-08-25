const db = require('../../config/dbConnect');
const { links, users } = require('../tables');

async function createLinksTable() {
    const tableExists = await db.schema.hasTable(links.tableName);
    if (!tableExists) {
        return db.schema.createTable(links.tableName, (table) => {
            table.increments(links.id).primary();
            table
                .uuid(links.uuid)
                .notNullable()
                .defaultTo(db.raw('gen_random_uuid()'));
            table
                .integer(links.ownerId)
                .references(users.id)
                .inTable(users.tableName)
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
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
    } else {
        return db.schema.alterTable(links.tableName, (table) => {
            table.dropForeign(links.ownerId);
            table
                .integer(links.ownerId)
                .references(users.id)
                .inTable(users.tableName)
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
                .alter();
        });
    }

}

module.exports = createLinksTable;
