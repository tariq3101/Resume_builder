const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.token; 
    //console.log(token)

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        console.log('Token verified');
        req.user = decoded; 
        console.log(req.user);
        next(); 
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = verifyToken;