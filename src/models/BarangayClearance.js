import { model } from "mongoose";
import barangayClearanceSchema from "./schemas/barangayClearanceSchema.js";

const BarangayClearance = model("BarangayClearance", barangayClearanceSchema);

export default BarangayClearance;
