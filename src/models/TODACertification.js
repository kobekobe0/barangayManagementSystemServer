import { model } from "mongoose";
import TODACertificationSchema from "./schemas/TODACertificationSchema.js";

const TODACertification = model("TODACertification", TODACertificationSchema);

export default TODACertification;
