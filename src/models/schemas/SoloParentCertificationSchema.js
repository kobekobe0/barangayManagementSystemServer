import { Schema } from "mongoose";

const soloParentCertificationSchema = new Schema({
    residentID: {
        type: Schema.Types.ObjectId,
        ref: "Resident",
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
    certificationNumber: {
        type: String,
        required: true,
    },
});

export default soloParentCertificationSchema;