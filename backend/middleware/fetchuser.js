const jwt = require('jsonwebtoken');
const secret = "This is business";


const fetchuser = (req, res, next) => {
    // get the auth token and extract user id from it and add it to req
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

    try {
        const data = jwt.verify(token, secret);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
}
module.exports = fetchuser;