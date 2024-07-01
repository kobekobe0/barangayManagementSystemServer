import { model } from "mongoose";
import formSchema from "./schemas/formSchema.js";

const Form = model("Form", formSchema);

export default Form;