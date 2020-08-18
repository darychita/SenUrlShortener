const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');
const {
    createLink,
    deleteLink,
    // updateLinks,
    getLinks,
    incrementViews
} = require('./queries/links');

class Link {
    constructor({ id = -1, ownerId, views,
                origin, endpoint = nanoid(7),
                createdAt, password,
                description } = {}) {
        this.id = id;
        this.ownerId = ownerId;
        this.views = views;
        this.origin = origin;
        this.endpoint = endpoint;
        this.createdAt = createdAt;
        this.isProtected = !!password;
        this.password = password;
        this.description = description;
    }

    async save() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 6);
        }
        const saved = await createLink({ ...this, id: undefined });
        if (saved.error) {
            if (saved.error.includes('duplicate')) {
                throw new Error('Duplicate');
            }
            return null;
        }

        this.id = saved[0].id;
        this.createdAt = saved[0].createdAt;
        return this;
    }

    async incremenetViews() {
        await incrementViews(this.id);
        return this;
    }

    async deleteLink() {
        await deleteLink(this.id);
        return null;
    }

    static async findLinkByEndpoint(endpoint) {
        const link = await getLinks({ endpoint }, 1);
        if (link && link.error) {
            throw new Error(link.error);
        }

        return link ? new Link(link) : null;
    }
}

module.exports = Link;
