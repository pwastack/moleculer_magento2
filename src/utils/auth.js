const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET

function verifyToken(req) {
    const bearerHeader = req.headers['authorization'];

    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        return bearer[1];
    }

    return false;
}

const auth = ({params: {req},meta} ) => {
    const token = verifyToken(req);

    try {
        const authorization = jwt.verify(token,JWT_SECRET);
        meta.authorization = authorization;
    } catch (e) {
        throw new Error(e.message);
    }
}

module.exports = auth;
