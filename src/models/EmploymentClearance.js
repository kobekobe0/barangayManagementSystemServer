import { model } from "mongoose";
import employmentClearanceSchema from "./schemas/employmentClearanceSchema.js";

const EmploymentClearance = model("EmploymentClearance", employmentClearanceSchema);

export default EmploymentClearance;
