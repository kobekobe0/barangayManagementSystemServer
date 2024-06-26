import { Schema } from "mongoose";

const reconstructionClearanceSchema = new Schema({
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
    titleNo: {
        type: String,
    },
    location: {
        type: String,
    },
});

export default reconstructionClearanceSchema;