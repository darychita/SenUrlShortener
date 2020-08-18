module.exports = {
    users: {
        tableName: 'users',
        id: 'id',
        username: 'username',
        email: 'email',
        password: 'password',
        createdAt: 'createdAt',
        active: 'isActive'
    },
    activationCodes: {
        tableName: 'activationCodes',
        id: 'id',
        userId: 'userId',
        expiresAt: 'expiresAt',
        code: 'code',
        type: 'codeType'
    },
    refreshTokens: {
        tableName: 'refreshTokens',
        id: 'id',
        token: 'token'
    },
    links: {
        tableName: 'links',
        id: 'id',
        ownerId: 'ownerId',
        views: 'views',
        origin: 'origin',
        endpoint: 'endpoint',
        createdAt: 'createdAt',
        isProtected: 'isProtected',
        password: 'password',
        description: 'description'
    }
};
