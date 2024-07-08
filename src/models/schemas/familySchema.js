import { Schema } from "mongoose";

const familySchema = new Schema({
    householdID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Household"
    },
    members: {
        type: [Schema.Types.ObjectId],
        default: [],
        ref: "Resident"
    }
});

export default familySchema;