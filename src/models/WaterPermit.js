import { model } from "mongoose";
import waterPermitSchema from "./schemas/waterPermitSchema.js";

const WaterPermit = model("WaterPermit", waterPermitSchema);

export default WaterPermit;
