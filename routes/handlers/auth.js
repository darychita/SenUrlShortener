const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/User');
const RefreshToken = require('../../models/RefreshToken');

const login = async (req, res) => {
    // 1. Authenticate user
    const { email, password } = req.body;
    const candidate = await User.findUserByEmail(email);
    if (!candidate) {
        return res.status(404).json({ message: 'User not found' });
    }

    // 2. Compare password 
    try {
        console.time('bcrypt')
        const match = await bcrypt.compare(password, candidate.password);
        console.timeEnd('bcrypt')
        if (!match) {
            return res.status(401).send();
        }
    } catch(e) {
        return res.status(500).send();
    }

    // 3. Create access and refresh token
    const accessToken = generateToken(candidate.id);
    const refreshToken = jwt.sign({ userId: candidate.id }, process.env.REFRESH_TOKEN_SECRET);
    const expiresIn = 20; // here will be 3 hours

    // 4. Save refresh token
    new RefreshToken(refreshToken).save();

    // return in json
    return res.json({ accessToken, refreshToken, expiresIn});
};

const updateAccessToken =  async (req, res) => {
    // 1. Get refresh token
    const token = new RefreshToken(req.body.token);

    // 2. Check if it exists in database
    const isExists = await token.isExists();
    if (!isExists) {
        return res.status(401).send();
    }

    // 3. If so, verify refresh token
    jwt.verify(token.token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        // 4. Get the user from callback
        if (err) {
            return res.status(403).send();
        }
        // 5. Generate new access token
        const accessToken = generateToken(user.userId);
        // 6. return everything (here we can return new refresh token)
        return res.json({ accessToken });
    });
};

const logout = (req, res) => {
    // Destroy refresh token if present 
    const { token } = req.body;
    if(!token) {
        return res.status(400).json({ message: 'Provide refresh token' });
    }

    new RefreshToken(token).delete();
    return res.status(204).send();
};

function generateToken(userId) {
    return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20s' });
}

module.exports = {
    login,
    updateAccessToken,
    logout
};
