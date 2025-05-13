const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    let token = req.headers['token'];

    if (!token) {
        return res.status(401).json({ status: "Unauthorized" });
    }

    jwt.verify(token, "secretKEY123456789", (err, decoded) => {
        if (err) {
            return res.status(401).json({ status: "Unauthorized" });
        } else {
            let email = decoded?.data?.email || decoded?.data;
            req.headers.email = email;
            next();
        }
    });
};
