import express from "express";
import productController from "./controller/productController.js";
import authorization from "../middleware/authorization.js";
import authentication from "../middleware/authentication.js";
let router = express.Router();

// Attach the read function to the "/read" route
router.post("/create", productController.create);
router.put(
    "/update/:id",
    // authentication,
    // authorization,
    productController.update
);
router.delete(
    "/delete/:id",
    // authentication,
    // authorization,
    productController.delete
);

export default router;
