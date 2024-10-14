import jwt from "jsonwebtoken";
import userDb from "../app/Model/user.js";

const authorization = async (req, res, next) => {
    /*
     * Checking if the  user is having the role access or not
    */
    try {
        const token = req.headers["token"];

        if (!token) {
            throw new Error("Authorization failed");
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        if (!verified) {
            throw new Error("Failed To Authenticate the User");
        }

        const userId = verified.userId;
        // now let find the Users Data form the userDatabase
        const userData = await userDb.findOne({ _id: userId, removed: false });

        if (!userData) {
            throw new Error("Cant access  Authorization Failed");
        }

        const role = userData.role;

        if (role !== "superAdmin" && role !== "admin") {
            throw new Error("You are not Authorized");
        }

        (req["role"] = userData.role), (req["userId"] = userData._id);
        (req["email"] = userData.email), (req["name"] = userData.name);
        next();
    } catch (error) {
        next(error);
    }
};

export default authorization;
