import { model } from "mongoose";
import censusSchema from "./schemas/censusSchema.js";

const Census = model("Census", censusSchema);

export default Census;
