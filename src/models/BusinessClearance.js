import { model } from "mongoose";
import businessClearanceSchema from "./schemas/businessClearanceSchema.js";

const BusinessClearance = model("BusinessClearance", businessClearanceSchema);

export default BusinessClearance;
