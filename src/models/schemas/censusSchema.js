import { Schema } from "mongoose";

const censusSchema = new Schema({
    residentID: {
        type: Schema.Types.ObjectId,
        ref: "Resident",
        required: true,
    },
    relationToHead: {
        type: String,
        required: true,
    },
    purpose: {
        type: String,
        required: true,
    },
    typeOfStructure: {
        type: String,
        enum: ["Residential", "Commercial", "School", "Church"],
    },
    ownership: {
        type: String,
        enum: ["Owned", "Rented", "Mortgaged", "Donated"],
    },
    yearsOccupied: {
        type: Number,
        min: 0,
        required: true,
    },
    nameOfHead: {
        type: String,
        required: true,
    },
    contactOfHead: {
        type: String,
        required: true,
    },
    numberOfResidents: {
        type: Number,
        min: 0,
        required: true,
    },
    titleNo: {
        type: String,
        required: true,
    },
    natureOfBusiness: String,
    businessName: String,
    ORNo: String,
    CTCNo: String,
    dateIssued: {
        type: Date,
        required: true,
        default: Date.now(),
    },
});

export default censusSchema;