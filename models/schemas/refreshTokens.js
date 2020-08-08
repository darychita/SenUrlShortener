const db = require('../../config/dbConnect');
const { refreshTokens } = require('../tables');

async function createRefreshTokenTable() {
    const tableExists = await db.schema.hasTable(refreshTokens.tableName);
    if (!tableExists) {
        return db.schema.createTable(refreshTokens.tableName, (table) => {
            table.increments(refreshTokens.id).primary();
            table
                .text(refreshTokens.token)
                .notNullable()
                .unique();
        });
    }
}

module.exports = createRefreshTokenTable;
