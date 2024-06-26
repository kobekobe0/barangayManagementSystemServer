import { model } from "mongoose";
import PAOCertificationSchema from "./schemas/PAOCertificationSchema.js";

const PAOCertification = model("PAOCertification", PAOCertificationSchema);

export default PAOCertification;
