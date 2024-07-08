import { model } from "mongoose";
import householdSchema from "./schemas/householdSchema.js";

const Household = model("Household", householdSchema);

export default Household;