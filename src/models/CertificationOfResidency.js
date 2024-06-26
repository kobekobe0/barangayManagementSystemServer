import { model } from "mongoose";
import certificationOfResidencySchema from "./schemas/certificationOfResidencySchema.js";

const CertificationOfResidency = model("CertificationOfResidency", certificationOfResidencySchema);

export default CertificationOfResidency;
