import { Schema } from "mongoose";

const indigentSchema = new Schema({
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Resident',
        required: true
    },
    receivedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Resident',
        required: true
    },
    problem: {
        type: String,
        default: ''
    },
    recommendation: {
        type: String,
        default: ''
    },
    amount: {
        type: Number,
        default: 0
    },
    approvedAt: {
        type: Date,
        default: Date.now
    },
    holderID: {
        type: Schema.Types.ObjectId,
        ref: 'IndigentHolder',
        required: true
    }
});

export default indigentSchema;