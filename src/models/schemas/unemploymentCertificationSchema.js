import { Schema } from "mongoose";

const unemploymentCertificationSchema = new Schema({
    residentID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Resident"
    },
    previousEmployment: {
        type: String,
        required: true,
    },
    dateLastEmployed: {
        type: Date,
        required: true,
    },
    dateIssued: {
        type: Date,
        required: true,
        default: Date.now,
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
    }
});

export default unemploymentCertificationSchema;