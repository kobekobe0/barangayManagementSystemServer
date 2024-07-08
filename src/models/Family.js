import { model } from "mongoose";
import familySchema from "./schemas/familySchema.js";

const Family = model("Family", familySchema);

export default Family;