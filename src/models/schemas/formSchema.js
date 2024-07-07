import { Schema } from "mongoose";
import FORMTYPES from "../../constants/forms";

const businessSchema = new Schema({
    businessName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    natureOfBusiness: String,
    plateNumber: String,
    cellphoneNumber: String,
    new: {
        type: Boolean,
        default: true,
    },
    dateClosed: Date,
});

const employmentSchema = new Schema({
    companyName: String,
    location: String,
    previousEmployment: String,
    dateLastEmployed: Date,
    position: String,
})

const indigencySchema = new Schema({
    relationToBeneficiary: {
        type: String,
        required: true,
    },
    beneficiaryName: {
        type: String,
        required: true,
    },
}); 

const buildingSchema = new Schema({
    address: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    titleNumber: String,
})

const electricalSchema = new Schema({
    address: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    titleNumber: String,
})

const fencingSchema = new Schema({
    address: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
})

const TODASchema = new Schema({
    model: {
        type: String,
        required: true,
    },
    motorNumber: {
        type: String,
        required: true,
    },
    chassisNumber: {
        type: String,
        required: true,
    },
    numberOfUnits: {
        type: Number,
        required: true,
        default: 1,
    },
    income: {
        type: Number,
        required: true,
    },
})

const reconstructionSchema = new Schema({
    location: {
        type: String,
        required: true,
    },
    titleNumber: String,
})

const zoningSchema = new Schema({
    location: {
        type: String,
    },
    vehicle: String,
    plateNumber: String,
})

const lipatBahaySchema = new Schema({
    items: [String],
    origin: String,
    destination: String,
})

const lateBCSchema = new Schema({
    mother: {
        type: String,
        required: true,
    },
    father: {
        type: String,
        required: true,
    },
});

const coHabitationSchema = new Schema({
    resident1: String,
    resident2: String,
    dateOfCoHabitation: Date,
    blotterEntryNumber: String,
    dateOfBlotter: Date,
    numberOfChildren: Number,
});

const calamitySchema = new Schema({
    causeOfCalamity: String,
    dateOccured: Date,
});

const formSchema = new Schema({
    residentID: {
        type: Schema.Types.ObjectId,
        ref: "Resident",
        required: true,
    },
    formType: {
        type: String,
        required: true,
        enum: Object.values(FORMTYPES)
    },
    formName: { //TODO: Auto generate, create new constant
        type: String,
        required: true,
    },
    OTCNo: String,
    ORNo: String,
    dateIssued: {
        type: Date,
        required: true,
        default: Date.now,
    },
    placeIssued: {
        type: String,
        required: true,
    },
    purpose: String,

    business: {
        type: businessSchema,
        default: undefined,
    },
    employment: {
        type: employmentSchema,
        default: undefined,
    },
    indigency: {
        type: indigencySchema,
        default: undefined,
    },

    building : {
        type: buildingSchema,
        default: undefined,
    },

    electrical : {
        type: electricalSchema,
        default: undefined,
    },

    fencing : {
        type: fencingSchema,
        default: undefined,
    },

    TODA : {
        type: TODASchema,
        default: undefined,
    },

    reconstruction : {
        type: reconstructionSchema,
        default: undefined,
    },

    PAO: {
        type: indigencySchema,
        default: undefined,
    },

    zoning: {
        type: zoningSchema,
        default: undefined,
    },

    lipatBahay: {
        type: lipatBahaySchema,
        default: undefined,
    },

    lateBC: {
        type: lateBCSchema,
        default: undefined,
    },

    coHabitation: {
        type: coHabitationSchema,
        default: undefined,
    },

    //solidWaste = business
    //unemployment = employment

    calamity: {
        type: calamitySchema,
        default: undefined,
    },

    formNumber: {
        type: String,
        required: true,
        unique: true,
    },

    expirationDate: {
        type: Date,
        required: true,
    },
});

export default formSchema;