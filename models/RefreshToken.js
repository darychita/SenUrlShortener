const { 
    createRefreshToken,
    isTokenExists,
    deleteToken
} = require('./queries/refreshTokens');

class RefreshToken {   
    constructor(token) {
        if (!token) {
            throw new Error('You must provide a token to store it');
        }
        this.token = token;
    }

    async save() {
        createRefreshToken(this.token);
        return this;
    }

    async isExists() {
        return isTokenExists(this.token);
    }

    async delete() {
        deleteToken(this.token);
        return this;
    }
}

module.exports = RefreshToken;
