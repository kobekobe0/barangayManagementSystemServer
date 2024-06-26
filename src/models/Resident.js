import { model } from "mongoose";
import residentSchema from "./schemas/residentSchema.js";

const Resident = model("Resident", residentSchema);

export default Resident;
