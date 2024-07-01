import { Schema } from "mongoose";
import censusSchema from "./censusSchema";

const nameSchema = new Schema({
    first: String,
    last: String,
    middle: String,
    suffix: String,
});

const addressSchema = new Schema({
    streetName: String,
    apartment: String,
    householdNumber: String,
    sitio: String,
});

const emergencyContactSchema = new Schema({
    name: nameSchema,
    relationship: String,
    mobileNumber: String,
    address: String,
});

const IDsSchema = new Schema({
    TIN: String,
    SSS: String,
    PAGIBIG: String,
    PhilHealth: String,
});

const voterInfoSchema = new Schema({
    precinctNumber: String,
    voterID: String,
});

const employmentSchema = new Schema({
    occupation: String,
    employer: String,
    employerAddress: String,
    yearsEmployed: Number,
    employmentStatus: {
        type: String,
        enum: ["Employed", "Unemployed", "Self-Employed", "Retired"],
    },
});

const residentSchema = new Schema({
    name: nameSchema,
    dateOfBirth: {
        type: Date,
        required: true,
    },
    dateOfDeath: {
        type: Date,
        default: null,
    },
    placeOfBirth: String,
    address: addressSchema,
    bloodType: {
        type: String,
        enum: ["A", "B", "AB", "O"],
    },
    sex: {
        type: String,
        enum: ["M", "F"],
    },
    citizenship: {
        type: String,
        required: true,
    },
    civilStatus: {
        type: String,
        enum: ["Single", "Married", "Divorced", "Widowed"],
    },
    mobileNumber: String,
    landlineNumber: String,
    emergencyContact: emergencyContactSchema,
    weight: Number, // in kg
    height: Number, // in cm
    educationalAttainment: String,
    IDs: IDsSchema,
    voterInfo: voterInfoSchema,
    picture: String,
    signature: String,
    religion: String,
    employment: employmentSchema,
    dateOfResidency: {
        type: Date,
        required: true,
    },
    blocked: {
        type: Schema.Types.ObjectId,
        ref: "BlockedLog",
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    census: {
        type: censusSchema
    }
});

export default residentSchema;
