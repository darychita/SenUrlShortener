const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ message: 'Authenticate first!'});
    }
    const [, token] = authHeader.split(' ');

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, { userId }) => {
        if (err) return res.status(403).json({ message: 'Wrong credentials!'});
        req.userId = userId;
        next();
    });
};

module.exports = authenticateToken;