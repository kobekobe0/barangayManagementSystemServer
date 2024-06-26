import { model } from "mongoose";
import lateRegistrationSchema from "./schemas/lateRegistrationSchema.js";

const LateRegistration = model("LateRegistration", lateRegistrationSchema);

export default LateRegistration;
