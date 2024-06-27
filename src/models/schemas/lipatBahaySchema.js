import { Schema } from "mongoose";

const lipatBahaySchema = new Schema({
    residentID: {
        type: Schema.Types.ObjectId,
        ref: "Resident",
        required: true,
    },
    items: {
        type: [String],
        required: true,
    },
    origin: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
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

export default lipatBahaySchema;