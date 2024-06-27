import { Schema } from "mongoose";

const certificationOfResidencySchema = new Schema({
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
    ORNo: {
        type: String,
    },
    CTCNo: {
        type: String,
    },
    certificationNumber: {
        type: String,
    },
    yearsOfResidency: {
        type: Number,
    },
    purpose: {
        type: String,
    },
});

export default certificationOfResidencySchema;