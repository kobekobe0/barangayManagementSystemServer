import { Schema } from "mongoose";

const barangayClearanceSchema = new Schema({
    residentID: {
        type: Schema.Types.ObjectId,
        ref: "Resident",
        required: true,
    },
    purpose: {
        type: String,
        required: true,
    },
    dateIssued: {
        type: Date,
        required: true,
    },
    placeIssued: {
        type: String,
        required: true,
    },
    ORNo: {
        type: String,
        required: true,
    },
    CTCNo: {
        type: String,
        required: true,
    },
    clearanceNumber: {
        type: String,
        required: true,
    },
});

export default barangayClearanceSchema;