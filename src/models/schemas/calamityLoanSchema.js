import { Schema } from "mongoose";

const calamityLoanSchema = new Schema({
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
    loanNumber: {
        type: String,
    },
    causeOfCalamity: {
        type: String,
        required: true,
    },
    dateOfCalamity: {
        type: Date,
        required: true,
    },
});

export default calamityLoanSchema;