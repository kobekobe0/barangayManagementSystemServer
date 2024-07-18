import { Schema } from "mongoose";

const censusSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    householdIDs: {
        type: [Schema.Types.ObjectId],
        default: [],
        ref: "Household"
    },
});

export default censusSchema;