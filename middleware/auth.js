const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authCookie = req.cookies['jwt'];

    // If there is no cookie, return an error
    if(authCookie == null) return res.sendStatus(401);

    // If there is a cookie, verify it
    jwt.verify(authCookie, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        // If there is an error, return an error
        if(err) return res.sendStatus(403);

        // If there is no error, continue the execution
        req.user = user;
        next();
    })
};

module.exports = auth;
