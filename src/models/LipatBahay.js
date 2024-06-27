import { model } from "mongoose";
import lipatBahaySchema from "./schemas/lipatBahaySchema.js";

const LipatBahay = model("LipatBahay", lipatBahaySchema);

export default LipatBahay;
