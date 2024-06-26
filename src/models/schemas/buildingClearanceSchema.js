import { Schema } from "mongoose";

const buildingClearanceSchema = new Schema({
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
    titleNo: {
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
        default: Date.now()
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

export default buildingClearanceSchema;