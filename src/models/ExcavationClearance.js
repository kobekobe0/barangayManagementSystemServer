import { model } from "mongoose";
import excavationClearanceSchema from "./schemas/excavationClearanceSchema.js";

const ExcavationClearance = model("ExcavationClearance", excavationClearanceSchema);

export default ExcavationClearancexcavationClearance;
