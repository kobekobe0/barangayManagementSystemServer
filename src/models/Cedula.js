import { model } from "mongoose";
import cedulaSchema from "./schemas/cedulaSchema.js";

const Cedula = model("Cedula", cedulaSchema);

export default Cedula;
