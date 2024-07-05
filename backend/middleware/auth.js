const jwt = require("jsonwebtoken");

const AuthMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(201).json({ message: "Unauthorized User! Please Login First!!!" });
        }

        const verify = jwt.verify(token, "secret");
        if (!verify) {
            return res.status(202).json({ message: "Unauthorized" });
        }

        req.user = verify;
        next();
    } catch (error) {
        console.log(error);
        
        return res.status(401).json({ message: "Unauthorized User! Please Login First!!!" });
    }
};

module.exports = AuthMiddleware;