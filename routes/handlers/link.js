const bcrypt = require('bcrypt');
const Link = require('../../models/Link');

const shortLink = async (req, res) => {
    const ownerId = req.userId || null;
    const keyLength = Object.keys(req.body).length;

    if (!ownerId && keyLength > 1) {
        return res.status(403).json({
            message: 'You are able to provide advanced params ' +
                        'only if you are registered.'
        });
    }

    const link = new Link({ ...req.body, ownerId });

    try {
        await link.save();

        return res.status(201).json({
            endpoint: `${process.env.HOST}/t/${link.endpoint}`
        });

    } catch ({ message }) {
        if (message === 'Duplicate') {
            return res.status(409).json({
                message: 'Such link already exists'
            });
        }
        return res.status(500).json({
            message: 'Ooops, something went wrong!'
        });
    }
};


const findLink = async (req, res) => {
    console.log('hey');
    const host = process.env.NODE_ENV === 'development'
                ? process.env.CLIENT_HOST
                : process.env.HOST;
    const { endpoint } = req.params;
    const candidate = await Link.findLinkByEndpoint(endpoint);
    if (!candidate) {
        return res.redirect(`${host}/404`);
        // return res.status(404).send();
    }

    if (candidate.isProtected) {
        if (req.method === 'GET') {
            return res.redirect(`${host}/protected/${endpoint}`);
        }

        const { password } = req.body;
        const match = await bcrypt.compare(password, candidate.password);
        if (!match) {
            return res.status(403).json({
                message: 'Wrong password'
            });
        }
    }
    await candidate.incremenetViews();
    if (req.method === 'GET') {
        return res.redirect(candidate.origin);
    } else {
        return res.json({ origin: candidate.origin });
    }

};
module.exports = {
    shortLink,
    findLink
};
