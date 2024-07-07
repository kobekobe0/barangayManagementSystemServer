import express from "express";

import { createResident, updateResident, updateResidentPicture } from "../controllers/mutation/resident.mutation.js";
import { getResident, getResidents } from "../controllers/query/resident.query.js";
import { processImage, uploadSingleImage } from "../middleware/uploadImage.js";

const residentRouter = express.Router();

residentRouter.post("/create", createResident);
residentRouter.put("/update/:id", updateResident);
residentRouter.put("/update-pfp/:id", uploadSingleImage, processImage, updateResidentPicture);

residentRouter.get("/", getResidents);
residentRouter.get("/:id", getResident);


export default residentRouter;



