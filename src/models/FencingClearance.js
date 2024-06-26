import { model } from "mongoose";
import fencingClearanceSchema from "./schemas/fencingClearanceSchema.js";

const FencingClearance = model("FencingClearance", fencingClearanceSchema);

export default FencingClearance;
