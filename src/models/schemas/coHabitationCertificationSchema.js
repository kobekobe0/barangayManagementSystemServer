import { Schema } from "mongoose";

const coHabitationCertificationSchema = new Schema({
    residentID: {
        type: Schema.Types.ObjectId,
        ref: "Resident",
        required: true,
    },
    coHabitorID: {
        type: Schema.Types.ObjectId,
        ref: "Resident",
        required: true,
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
    dateOfCoHabitation: {
        type: Date,
        required: true,
    },
    blotterEntryNo: {
        type: String,
        required: true,
    },
    dateOfBlotterEntry: {
        type: Date,
        required: true,
    },
    numberOfChildren: {
        type: Number,
        required: true,
        default: 0
    },
    CTCNo: {
        type: String,
    },
    ORNo: {
        type: String,
    },
    dateIssued: {
        type: Date,
        required: true,
        default: Date.now,
    },
    placeIssued: {
        type: String,
        required: true,
    }
});

export default coHabitationCertificationSchema;