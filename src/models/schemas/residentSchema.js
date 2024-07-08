import { Schema } from "mongoose";

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
    name: String,
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
    isRegistered: Boolean
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
        default: "Filipino",
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
    pregnant: {
        type: Boolean,
        default: false,
    },
    picture: String,
    religion: String,
    employment: employmentSchema,
    yrsOfResidency: Number,
    blocked: {
        type: Schema.Types.ObjectId,
        ref: "BlockedLog",
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    sector: String,
    p4: Boolean,
    regBusiness: Boolean,
    familyPlanning: Boolean
});

export default residentSchema;
