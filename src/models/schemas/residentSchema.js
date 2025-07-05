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
        type: Date
    },
    dateOfDeath: Date,
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
        enum: ["single", "married", "divorced", "widowed"],
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
    p4: {
        type: Boolean,
        default: false,
    },
    registeredBusiness: {
        type: Boolean,
        default: false,
    },
    familyPlanning: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    age: {
        type: Number,
        default: 0,
    }
});

export default residentSchema;
