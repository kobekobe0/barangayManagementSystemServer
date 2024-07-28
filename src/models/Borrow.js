import { model } from "mongoose";
import borrowSchema from "./schemas/borrowSchema.js";

const Borrow = model("Borrow", borrowSchema);

export default Borrow;
