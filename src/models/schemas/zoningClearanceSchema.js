import { Schema } from "mongoose";

const zoningClearanceSchema = new Schema({
    residentID: {
        type: Schema.Types.ObjectId,
        ref: "Resident",
        required: true,
    },
    dateIssued: {
        type: Date,
        required: true,
        default: Date.now
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
    clearanceNumber: {
        type: String,
    },
    location: {
        type: String,
    },
    vehicle: {
        type: String,
    },
    plate: {
        type: String,
    },
    name: {
        type: String,
    },
});

export default zoningClearanceSchema;