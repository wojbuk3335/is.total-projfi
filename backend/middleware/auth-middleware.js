// middleware/auth-middleware.js
const axios = require('axios');

const authMiddleware = async (req, res, next) => {
    try {
        const response = await axios.get('https://rcpharmapass.epph.pl/user', {
            headers: {
                'Client-ID': process.env.CLIENT_ID,
                'Client-Secret': process.env.CLIENT_SECRET,
                'Authorization': `Bearer ${req.cookies['pharmapass-jar']}`
            }
        });
        req.user = response.data.userData;
        next();
    } catch (error) {
        res.redirect('/pharmapass/login');
    }
};

module.exports = authMiddleware;