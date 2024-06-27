import { Schema } from "mongoose";

const lateRegistrationSchema = new Schema({
    residentID: {
        type: Schema.Types.ObjectId,
        ref: "Resident",
        required: true,
    },
    dateIssued: {
        type: Date,
        required: true,
        default: Date.now
    },
    placeIssued: {
        type: String,
        required: true,
    },
    certificationNumber: {
        type: String,
    },
    fatherName: {
        type: String,
    },
    motherName: {
        type: String,
    },
});