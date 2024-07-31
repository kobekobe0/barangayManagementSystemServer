import { model } from "mongoose";
import censusReportSchema from "./schemas/censusReportSchema.js";

const CensusReport = model("CensusReport", censusReportSchema);

export default CensusReport;