import { Schema } from "mongoose";

const solidWasteDisposalSchema = new Schema({
    residentID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Resident"
    },
    businessClearanceId: {
        type: Schema.Types.ObjectId,
        ref: "BusinessClearance",
    },
    businessName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    dateIssued: {
        type: Date,
        required: true,
        default: Date.now,
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
    CTCNo: {
        type: String,
    },
});

export default solidWasteDisposalSchema;

