import { Schema } from "mongoose";

const waterPermitSchema = new Schema({
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
    permitNumber: {
        type: String,
    }
});

export default waterPermitSchema;