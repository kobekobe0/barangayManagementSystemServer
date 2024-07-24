import { model } from "mongoose";
import indigentHolderSchema from "./schemas/indigentHolderSchema.js";

const IndigentHolder = model("IndigentHolder", indigentHolderSchema);

export default IndigentHolder;