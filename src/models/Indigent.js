import { model } from "mongoose";
import indigentSchema from "./schemas/indigentSchema.js";

const Indigent = model("Indigent", indigentSchema);

export default Indigent;