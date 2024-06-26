import { model } from "mongoose";
import electricalClearanceSchema from "./schemas/electricalClearanceSchema.js";

const ElectricalClearance = model("ElectricalClearance", electricalClearanceSchema);

export default ElectricalClearance;
