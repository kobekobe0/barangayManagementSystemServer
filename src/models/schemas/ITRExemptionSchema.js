import { Schema } from "mongoose";

const ITRExemptionSchema = new Schema({
    residentID: {
        type: Schema.Types.ObjectId,
        ref: "Resident",
        required: true,
    },
    purpose: {
        type: String,
    },
    CTCNo: {
        type: String,
    },
    dateIssued: {
        type: Date,
        default: Date.now()
    },
    placeIssued: {
        type: String,
    },
    ORNo: {
        type: String,
    },
    certificationNumber: {
        type: String,
    },
});

export default ITRExemptionSchema;