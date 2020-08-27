const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');
const {
    createLink,
    deleteLink,
    updateLink,
    getLinks,
    incrementViews,
    getLinksAmount
} = require('./queries/links');
const { validateIsEmpty } = require('../utils');

class Link {
    constructor({ id = -1, ownerId, views,
                origin, endpoint = nanoid(7),
                createdAt, password,
                description, uuid } = {}) {
        this.id = id;
        this.ownerId = ownerId;
        this.views = views;
        this.origin = origin;
        this.endpoint = endpoint;
        this.createdAt = createdAt;
        this.isProtected = !!password;
        this.password = password;
        this.description = description;
        this.uuid = uuid;
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
            throw new Error(saved.error);
        }

        this.id = saved[0].id;
        this.createdAt = saved[0].createdAt;
        this.uuid = saved[0].uuid;
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

    async update(updateSet = validateIsEmpty('Updateset in Link')) {
        const updated = await updateLink(this.uuid, updateSet);
        if (!updated || (updated && updated.error)) {
            throw new Error('Cannot update link.');
        }
        Object.entries(updated).forEach(([key, value]) => {
            this[key] = value;
        });
        return this;
    }

    async delete() {
        await deleteLink(this.uuid);
        return null;
    }

    static async findLinkByEndpoint(endpoint) {
        const link = await getLinks({ endpoint }, 1);
        if (link && link.error) {
            throw new Error(link.error);
        }

        return link ? new Link(link) : null;
    }

    static async getLinksByUserId(userId, limit, offset) {
        const raw = await getLinks({ ownerId: userId }, limit, offset);
        if (!raw) {
            return null;
        }
        if (raw.error) {
            throw new Error(raw.error);
        }
        const links = [raw].flat(1).map((link) => new Link(link));
        return links;
    }

    static async getAmountOfLinksInUser(userId) {
        return await getLinksAmount({ ownerId: userId });
    }
}

module.exports = Link;
