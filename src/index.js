import * as dotenv from "dotenv";
import express from "express";
import connectToMongoDB from "./config/database.js";
import cors from "cors";
import createSocketServer from "./config/socket.js";

import path,  { dirname } from 'path';
import { fileURLToPath } from 'url';
import residentRouter from "./routes/Resident.js";
import blockLogRouter from "./routes/BlockLog.js";
import cenusRouter from "./routes/Cenus.js";
import { sanitizeObjectWithTrimMiddleware } from "./helper/sanitizeData.js";
import receiptRouter from "./routes/Receipt.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config();

connectToMongoDB();

const app = express();
app.use('/images', express.static(path.join(__dirname)));

const port = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: [
        "http://localhost:3000",
        "http://localhost:3000/",
        "http://localhost:5173",
        "http://localhost:5173/",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

const io = createSocketServer(app, port);

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

//prevent writes during sync
//app.use(preventWritesDuringSync);

app.use(sanitizeObjectWithTrimMiddleware)

app.use("/api/resident", residentRouter)
app.use("/api/blocklog", blockLogRouter)
app.use("/api/census", cenusRouter)
app.use("/api/receipt", receiptRouter)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

export { io };

