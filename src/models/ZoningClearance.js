import { model } from "mongoose";
import zoningClearanceSchema from "./schemas/zoningClearanceSchema.js";

const ZoningClearance = model("ZoningClearance", zoningClearanceSchema);

export default ZoningClearance;
