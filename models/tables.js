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
    }
};
