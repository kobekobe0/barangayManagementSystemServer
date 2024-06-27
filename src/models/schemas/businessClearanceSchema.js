import { Schema } from "mongoose";

const businessClearanceSchema = new Schema({
    residentID: {
        type: Schema.Types.ObjectId,
        ref: "Resident",
    },
    natureOfBusiness: {
        type: String,
    },
    businessName: {
        type: String,
    },
    location: {
        type: String,
    },
    addressNo: {
        type: String,
    },
    ORNo: {
        type: String,
    },
    CTCNo: {
        type: String,
    },
    dateIssued: {
        type: Date,
        default: Date.now
    },
    placeIssued: {
        type: String,
    },
    plateNo: {
        type: String,
    },
    mobileNo: {
        type: String,
    },
    amount: {
        type: Number,
    },
    clearanceNumber: {
        type: String,
    },
});

export default businessClearanceSchema;