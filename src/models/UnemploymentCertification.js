import { model } from "mongoose";
import unemploymentCertificationSchema from "./schemas/unemploymentCertificationSchema.js";

const UnemploymentCertification = model("UnemploymentCertification", unemploymentCertificationSchema);

export default UnemploymentCertification;
