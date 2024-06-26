import { model } from "mongoose";
import reconstructionClearanceSchema from "./schemas/reconstructionClearanceSchema.js";

const ReconstructionClearance = model("ReconstructionClearance", reconstructionClearanceSchema);

export default ReconstructionClearance;
