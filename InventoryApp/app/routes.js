import express from "express";
import readController from "./controller/readController.js"; // Ensure correct path

let router = express.Router();

// Attach the read function to the "/read" route
router.get("/read", readController);

export default router;
