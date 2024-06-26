import { model } from "mongoose";
import indigencyCertificationSchema from "./schemas/indigencyCertificationSchema.js";

const IndigencyCertification = model("IndigencyCertification", indigencyCertificationSchema);

export default IndigencyCertification;
