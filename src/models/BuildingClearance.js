import { model } from "mongoose";
import buildingClearanceSchema from "./schemas/buildingClearanceSchema.js";

const BuildingClearance = model("BuildingClearance", buildingClearanceSchema);

export default BuildingClearance;
