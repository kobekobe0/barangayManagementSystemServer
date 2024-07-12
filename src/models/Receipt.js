import { model } from "mongoose";
import receiptSchema from "./schemas/receiptSchema.js";

const Receipt = model("Receipt", receiptSchema);

export default Receipt;