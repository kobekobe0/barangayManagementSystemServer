import { model } from "mongoose";
import closedBusinessCertificationSchema from "./schemas/closedBusinessCertificationSchema.js";

const ClosedBusinessCertification = model("ClosedBusinessCertification", closedBusinessCertificationSchema);

export default ClosedBusinessCertification;
