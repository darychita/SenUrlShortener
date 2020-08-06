const { createUser, getUser, updateUser } = require('./queries/user');
const {
    createActivationCode,
    findByActivationCode,
    deleteActivationCode
} = require('./queries/activationCodes');
// const { randomToken } = require('../utils');

class User {
    constructor({ username, email, password, id = -1, isActive = false } = {}) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.id = id;
        this.isActive = isActive;
    }

    async save() {
        const savedUser = await createUser(this);
        if (savedUser.error) {
            throw new Error(savedUser.message);
        }
        this.id = savedUser.id;
        this.createdAt = savedUser.createdAt;
        this.isActive = savedUser.isActive;
        return this;
    }

    // sets active status to user and deletes confirmation code
    async setActive() {
        await updateUser(this.id, {
            isActive: true
        });
        this.isActive = true;
        await deleteActivationCode(this.id);
        return this;
    }

    async setActivationCode(code) {
        if (this.id < 0) {
            throw new Error('Cannot set activation code for nonexisting user!');
        }

        if (this.isActive) {
            throw new Error('This user is already registered!');
        }

        await createActivationCode(this.id, code);
        return this;
    }

    static async findUser(where) {
        const rawUser = await getUser(where);
        if (rawUser.error) {
            throw new Error(rawUser.message);
        }
        return rawUser.length !== 0 ? new User(rawUser[0]) : null;
    }

    static async findUserByEmail(email) {
        return User.findUser({ email });
    }

    static async findUserByActivationCode(code) {
        const raw = await findByActivationCode(code);
        if (!raw || raw.error) {
            return null;
        }

        return [new User(raw), raw.expiresAt];
    }
}

module.exports = User;
