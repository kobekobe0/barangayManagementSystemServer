import { Schema } from "mongoose";

const indigentHolderSchema = new Schema({
    amount: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    exhaustedAt: Date,
});

export default indigentHolderSchema;