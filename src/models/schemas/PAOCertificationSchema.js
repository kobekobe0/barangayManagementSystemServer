import { Schema } from "mongoose";

const PAOCertificationSchema = new Schema({
    residentID: {
        type: Schema.Types.ObjectId,
        ref: "Resident",
        required: true,
    },
    dateIssued: {
        type: Date,
        required: true,
        default: Date.now()
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
    relation: {
        type: String,
    },
    beneficiary: {
        type: String,
    },
});

export default PAOCertificationSchema;