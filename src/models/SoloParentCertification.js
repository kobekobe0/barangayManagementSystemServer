import { model } from "mongoose";
import soloParentCertificationSchema from "./schemas/soloParentCertificationSchema.js";

const SoloParentCertification = model("SoloParentCertification", soloParentCertificationSchema);

export default SoloParentCertification;
