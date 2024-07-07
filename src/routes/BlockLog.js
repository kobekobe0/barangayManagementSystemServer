import express from "express";
import { blockResident, unblockResident } from "../controllers/mutation/block.mutation.js";

const blockLogRouter = express.Router();

blockLogRouter.put("/block/:id", blockResident);
blockLogRouter.put("/unblock/:id", unblockResident);



export default blockLogRouter;
