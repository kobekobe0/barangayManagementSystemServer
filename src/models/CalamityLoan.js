import { model } from "mongoose";
import calamityLoanSchema from "./schemas/calamityLoanSchema.js";

const CalamityLoan = model("CalamityLoan", calamityLoanSchema);

export default CalamityLoan;
