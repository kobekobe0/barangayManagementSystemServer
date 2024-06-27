import { Schema } from "mongoose";

const closedBusinessCertificationSchema = new Schema({
    residentId: {
        type: Schema.Types.ObjectId,
        ref: "Resident",
        required: true,
    },
    //fk to business clearance
    businessClearanceId: {
        type: Schema.Types.ObjectId,
        ref: "BusinessClearance",
    },
    businessName: {
        type: String,
        required: true,
    },
    businessAddress: {
        type: String,
        required: true,
    },
    dateClosed: {
        type: Date,
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
    ORNo: {
        type: String,
    },
    CTCNo: {
        type: String,
    },
    certificationNumber: {
        type: String,
    },
});

export default closedBusinessCertificationSchema;