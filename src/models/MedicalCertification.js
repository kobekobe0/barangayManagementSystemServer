import { model } from "mongoose";
import medicalCertificationSchema from "./schemas/medicalCertificationSchema.js";

const MedicalCertification = model("MedicalCertification", medicalCertificationSchema);

export default MedicalCertification;
