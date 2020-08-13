const db = require('../../config/dbConnect');
const { users } = require('../tables');

async function createUserTable() {
    const tableExists = await db.schema.hasTable(users.tableName);
    if (!tableExists) {
        return db.schema.createTable(users.tableName, (table) => {
            table.increments(users.id).primary();
            table
                .string(users.email)
                .notNullable()
                .unique();
            table
                .string(users.username)
                .notNullable()
                .unique();
            table.string(users.password).notNullable();
            table
                .timestamp(users.createdAt)
                .notNullable()
                .defaultTo(db.fn.now());

            table
                .boolean(users.active)
                .notNullable()
                .defaultTo(false);
        });
    }
}

module.exports = createUserTable;
