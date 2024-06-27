import { Schema } from "mongoose";

const employmentClearanceSchema = new Schema({
    residentID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Resident"
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
    company: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    purpose: {
        type: String,
        required: true,
    }
});

export default employmentClearanceSchema;