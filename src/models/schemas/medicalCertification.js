import { Schema } from "mongoose";

const medicalCertificationSchema = new Schema({
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
    certificationNumber: {
        type: String,
    }
});

export default medicalCertificationSchema;