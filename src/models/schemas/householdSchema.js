import { Schema } from "mongoose";

const addressSchema = new Schema({
    streetName: String,
    apartment: String,
    householdNumber: String,
    sitio: String,
}, { _id: false });

const householdSchema = new Schema({
    address: addressSchema,
    head: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Resident"
    },
    censusID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Census"
    },
    isUnique: {
        type: Boolean,
        default: false
    },
    identifier: String,
});

export default householdSchema;