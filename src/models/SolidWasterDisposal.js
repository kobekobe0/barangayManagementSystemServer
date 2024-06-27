import { model } from "mongoose";
import solidWasteDisposalSchema from "./schemas/solidWasteDisposalSchema.js";

const SolidWasteDisposal = model("SolidWasteDisposal", solidWasteDisposalSchema);

export default SolidWasteDisposal;
