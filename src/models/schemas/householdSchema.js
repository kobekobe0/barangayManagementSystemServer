import { Schema } from "mongoose";

const addressSchema = new Schema({
    streetName: String,
    apartment: String,
    householdNumber: String,
    sitio: String,
});

const householdSchema = new Schema({
    address: {
        type: addressSchema,
        required: true
    },
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
        required: true,
        default: true
    },
    identifier: {
        type: String,
        default: null         
    }
});

export default householdSchema;