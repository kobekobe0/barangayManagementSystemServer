import express from "express";
import { blockResident, unblockResident } from "../controllers/mutation/block.mutation.js";
import { getAllBlockLog, getResidentBlockLog } from "../controllers/query/block.query.js";

const blockLogRouter = express.Router();

blockLogRouter.put("/block/:id", blockResident);
blockLogRouter.put("/unblock/:id", unblockResident);

blockLogRouter.get("/", getAllBlockLog);
blockLogRouter.get("/:id", getResidentBlockLog);



export default blockLogRouter;
