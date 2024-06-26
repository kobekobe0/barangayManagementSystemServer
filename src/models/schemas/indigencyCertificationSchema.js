import { Schema } from "mongoose";

const indigencyCertificationSchema = new Schema({
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
    relations: {
        type: String,
    },
    purpose: {
        type: String,
    },
    beneficiary: {
        type: String,
    },
});

export default indigencyCertificationSchema;