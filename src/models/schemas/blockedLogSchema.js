import { Schema } from "mongoose";

const blockedLogSchema = new Schema({
    residentID: {
        type: Schema.Types.ObjectId,
        ref: "Resident",
        required: true,
    },
    isBlocked: {
        type: Boolean,
        required: true,
        default: false,
    },
    dateBlocked: {
        type: Date,
    },
    dateUnblocked: {
        type: Date,
    },
    reason: {
        type: String,
        required: true,
        default: "No reason provided",
    },
});

export default blockedLogSchema;