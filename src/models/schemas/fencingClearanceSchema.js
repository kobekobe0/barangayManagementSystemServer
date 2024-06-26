import { Schema } from "mongoose";

const fencingClearanceSchema = new Schema({
    residentID: {
        type: Schema.Types.ObjectId,
        ref: "Resident",
        required: true,
    },
    addressNo: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    CTCNo: {
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
    clearanceNumber: {
        type: String,
        required: true,
    },
});

export default fencingClearanceSchema;