import { model } from "mongoose";
import businessSchema from "./schemas/businessSchema.js";

const Business = model("Business", businessSchema);

export default Business;
