import { Schema } from "mongoose";

const TODACertificationSchema = new Schema({
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
    certificationNumber: {
        type: String,
    },

    modelYear: {
        type: String,
        required: true,
    },
    motorNo: {
        type: String,
        required: true,
    },
    chassisNo: {
        type: String,
        required: true,
    },
    numberOfUnits: {
        type: Number,
        required: true,
    },
    income: {
        type: Number,
        required: true,
    },

});

export default TODACertificationSchema;