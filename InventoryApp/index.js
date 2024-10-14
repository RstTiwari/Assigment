import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import dotenv from "dotenv";
import https from "https";
import http from "http";
import fs from "fs";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import router from "./app/productRoutes.js";
import productWatch from "./app/WatchStream/productWatch.js";
import errorHandler from "./middleware/errorHandler.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.use(cookieParser());

app.use("/app", router);
app.use(errorHandler)

const Port = process.env.PORT || 5001;
const DatabaseString = process.env.DatabaseString;
const environment = process.env.NODE_ENV;

// connecting the mongodb database
mongoose
    .connect(DatabaseString, {})
    .then(() => {
        let backendServer;
        if (environment == "production") {
            const options = {
                key: fs.readFileSync(process.env.KEY_PATH),
                cert: fs.readFileSync(process.env.CERT_PATH),
            };

            backendServer = https.createServer(options, app);
        } else {
            backendServer = http.createServer(app);
        }

        let io = new Server(backendServer, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
            },
            transports: ["websocket", "polling"],
        });

        backendServer.listen(Port, () => {
            console.log(
                `Server is running on the port ${Port} on ${environment} environment`
            );
        });

        io.on("connection", (socket) => {
            // ...
            console.log(
                "socket connected with the client in  with socket id",
                socket.id,socket,
            );
            socket.on("message", (data) => {
                console.log("received message from client", data);
                io.emit("message", `${data}will be resolved soon`);
            });

            socket.on("disconnect", () => {
                console.log(socket.id, "client disconnected");
            });
        });

        productWatch(io);
    })
    .catch((e) => {
        console.log("Database connection failed" + e);
    });
