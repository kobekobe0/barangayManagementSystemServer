import { Schema } from "mongoose";

const businessSchema = new Schema({
    residentID: {
        type: Schema.Types.ObjectId,
        ref: 'Resident',
        required: true
    },
    businessName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        default: 0,
    },
    natureOfBusiness: String,
    plateNumber: String,
    cellphoneNumber: String,
    isExpired: {
        type: Boolean,
        default: false,
    },
    isNew: {
        type: Boolean,
        default: true,
    },
    isClosed: {
        type: Boolean,
        default: false,
    },
    dateClosed: Date,
    formIDs: {
        type: [Schema.Types.ObjectId],
        default: [],
        ref: "Form"
    }
});

export default businessSchema;