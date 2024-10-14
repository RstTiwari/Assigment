import jwt from "jsonwebtoken";
import userDb from "../app/Model/user.js";

const authentication = async (req, res, next) => {
    try {
        const token = req.headers.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message:
                    "Authentication token is missing, authorization denied.",
                jwtExpired: true,
            });
        }

        let verified;
        try {
            verified = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(403).json({
                success: false,
                message: "Invalid authentication token, authorization denied.",
                jwtExpired: err.name === "TokenExpiredError",
            });
        }

        const user = await userDb.findOne({ _id: verified.userId });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found, authorization denied.",
                jwtExpired: false,
            });
        }

        req.userId = user._id;
        req.role = user.role;
        req.tenantId = user.tenantId;
        req.name = user.name;

        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An internal server error occurred.",
            error: error.message,
        });
    }
};

export default authentication;
