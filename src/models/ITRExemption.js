import { model } from "mongoose";
import ITRExemptionSchema from "./schemas/ITRExemptionSchema.js";

const ITRExemption = model("ITRExemption", ITRExemptionSchema);

export default ITRExemption;
