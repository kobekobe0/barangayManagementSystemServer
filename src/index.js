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
import businessRouter from "./routes/Business.js";
import indigentRouter from "./routes/Indigent.js";
import cedulaRouter from "./routes/Cedula.js";
import formRouter from "./routes/Form.js";
import borrowRouter from "./routes/Borrow.js";
import censusReportRouter from "./routes/CensusReport.js";
import { exec } from "child_process";

import mongoose from "mongoose";
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config();

connectToMongoDB();

const app = express();


const port = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: [
        "http://localhost:3000",
        "http://localhost:3000/",
        "http://localhost:5173",
	"http://192.168.100.104",
        "http://localhost:5173/",
        "http://192.168.1.242",
	"*"
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.use('/images', express.static(path.join(__dirname)));

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
app.use('/api/business', businessRouter)
app.use('/api/indigent', indigentRouter)
app.use('/api/cedula', cedulaRouter)
app.use('/api/form', formRouter)
app.use('/api/borrow', borrowRouter)
app.use('/api/censusReport', censusReportRouter)

//shutdown
app.post('/api/shutdown', (req, res) => {
    console.log('Shutting down server');
    try{
        exec('sudo /sbin/shutdown -h now', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing shutdown: ${error}`);
                return res.status(500).json({ message: 'Failed to shut down server' });
            }
            res.status(200).json({ message: 'Server is shutting down' });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to shut down server' });
    }
});

app.post('/api/backup', async (req, res) => {
    try {
        // Get all collections
        const collections = await mongoose.connection.db.listCollections().toArray();
    
        // Connect to remote DB
        const remoteDB = await mongoose.createConnection(process.env.BACKUP_PATH, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).asPromise();
    
        // Drop all collections in remote DB
        for (let collection of collections) {
            try {
                await remoteDB.db.dropCollection(collection.name);
            } catch (error) {
                // Log error but continue to backup other collections
                console.error(`Failed to drop collection ${collection.name}: ${error}`);
            }
        }
    
        // Copy all collections
        for (let collection of collections) {
            const cursor = mongoose.connection.db.collection(collection.name).find();
            const data = await cursor.toArray();
            
            // Insert data only if it's not empty
            if (data.length > 0) {
                try {
                    await remoteDB.db.collection(collection.name).insertMany(data);
                } catch (error) {
                    console.error(`Failed to insert data into collection ${collection.name}: ${error}`);
                }
            }
        }
    
        // Close remote DB
        await remoteDB.close();
    
        return res.status(200).json({ message: 'Database backup successful' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to backup database' });
    }
});




app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

export { io };

