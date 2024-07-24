import { Schema } from "mongoose";

const nameSchema = new Schema({
    first: {
        type: String,
        required: true,
    },
    middle: {
        type: String,
        default: null,
    },
    last: {
        type: String,
        required: true,
    },
    suffix: {
        type: String,
        default: null,
    },
});

const nonResidentSchema = new Schema({
    name: nameSchema,
    address: String,
    dateOfBirth: Date,
    placeOfBirth: String,
});

const businessSchema = new Schema({
    residentID: {
        type: Schema.Types.ObjectId,
        ref: 'Resident',
    },
    ownerAdress: String,
    isResident: {
        type: Boolean,
        default: true,
    },
    nonResident: {
        type: nonResidentSchema,
        default: null,
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
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
});

export default businessSchema;