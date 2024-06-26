import { model } from "mongoose";
import blockedLogSchema from "./schemas/blockedLogSchema.js";

const BlockedLog = model("BlockedLog", blockedLogSchema);

export default BlockedLog;
