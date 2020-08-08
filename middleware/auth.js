const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const [, token] = authHeader.split(' ');
    if (!token) return res.status(401).send(); 

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.status(403).send(); 
        req.user = user;
        next();
    });
}; 

module.exports = authenticateToken;