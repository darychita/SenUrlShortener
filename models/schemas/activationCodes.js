const db = require('../../config/dbConnect');
const { activationCodes, users } = require('../tables');

async function createActivationCodesTable() {
    const tableExists = await db.schema.hasTable(activationCodes.tableName);
    if (!tableExists) {
        return db.schema.createTable(activationCodes.tableName, (table) => {
            table.increments(activationCodes.id).primary();
            table
                .integer(activationCodes.userId)
                .notNullable()
                .unique()
                .references(users.id)
                .inTable(users.tableName);

            table
                .timestamp(activationCodes.expiresAt)
                .notNullable();

            table
                .text(activationCodes.code)
                .unique()
                .notNullable();
        });
    }
}

module.exports = createActivationCodesTable;
