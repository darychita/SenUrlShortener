const { createUser, getUser, updateUser, deleteUser } = require('./queries/user');
const {
    createActivationCode,
    findByActivationCode,
    deleteActivationCode
} = require('./queries/activationCodes');
const activationCodeTypes = require('./activationCodeTypes');

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
        await this.deleteCodes();
        return this;
    }

    async setActivationCode(code) {
        if (this.id < 0) {
            throw new Error('Cannot set activation code for nonexisting user!');
        }

        if (this.isActive) {
            throw new Error('This user is already registered!');
        }
        const expires = 24 * 3600 * 1000; // one day
        await createActivationCode(
            this.id, code, activationCodeTypes.emailActivation, expires
        );
        return this;
    }

    async delete() {
        await deleteUser(this.id);
        return null;
    }

    async setPasswordResetToken(code) {
        const expires = 30 * 1000;
        // const expires = 3600 * 1000; // one hour
        const result = await createActivationCode(
            this.id, code, activationCodeTypes.passwordActivation, expires
        );
        if (result.error) {
            throw new Error('Reset password request is already created!');
        }
        return this;
    }

    async updatePassword(passwordHash) {
        await updateUser(this.id, {
            password: passwordHash
        });
        this.password = passwordHash;
        return this;
    }

    async deleteCodes() {
        await deleteActivationCode(this.id);
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

    static async findUserById(id) {
        return User.findUser({ id });
    }

    static async findUserByCode(code, type) {
        const raw = await findByActivationCode(code, type);
        if (!raw || raw.error) {
            return null;
        }

        return [new User({...raw, id: raw.userId }), raw.expiresAt];
    }

    static async findUserByActivationCode(code) {
        return User.findUserByCode(code, activationCodeTypes.emailActivation);
    }

    static async findUserByResetPassword(code) {
        return User.findUserByCode(
            code, activationCodeTypes.passwordActivation
        );
    }

}

module.exports = User;
