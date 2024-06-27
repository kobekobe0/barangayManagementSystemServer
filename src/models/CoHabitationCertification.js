import { model } from "mongoose";
import coHabitationCertificationSchema from "./schemas/coHabitationCertificationSchema.js";

const CoHabitationCertification = model("CoHabitationCertification", coHabitationCertificationSchema);

export default CoHabitationCertification;
