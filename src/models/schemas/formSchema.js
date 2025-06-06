import { Schema } from "mongoose";
import FORMTYPES from "../../constants/forms.js";

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
    location: String,
    titleNumber: String,
})

const electricalSchema = new Schema({
    location: String,
    titleNumber: String,
})

const fencingSchema = new Schema({
    address: String,
    location: String
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
    plateNumber: {
        type: String,
        default: null,
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
    fatherOccupation: {
        type: String,
    }, 
    motherOccupation: {
        type: String,
    },
    religion: {
        type: String,
    },
    isMerried: {
        type: Boolean,
        default: false,
    },
    nameOfChild: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
    },
    placeOfBirth: {
        type: String,
    },
    school: {
        type: String,
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

const excavationSchema = new Schema({
    location: {
        type: String,
        required: true,
    },
    titleNumber: String,
})

const ITRSchema = new Schema({
    incomeMin: {
        type: Number,
        default: 0,
    },
    incomeMax: {
        type: Number,
        default: 0,
    },
});

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


const formSchema = new Schema({
    residentID: {
        type: Schema.Types.ObjectId,
        ref: "Resident",
    },
    isResident: {
        type: Boolean,
        default: true,
    },
    nonResident: {
        type: nonResidentSchema,
        default: null,
    },
    image: {
        type: String,
        default: null,
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
    CTCNo: String,
    ORNo: String,
    dateIssued: {
        type: Date,
        default: null
    },
    placeIssued: {
        type: String,
        required: true,
    },
    purpose: String,

    business: {
        type: Schema.Types.ObjectId,
        default: undefined,
        ref: 'Business'
    },
    employment: {
        type: employmentSchema,
        default: undefined,
    },
    indigency: {
        type: indigencySchema,
        default: undefined,
    },
    excavation: {
        type: excavationSchema,
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

    ITR: {
        type: ITRSchema,
        default: undefined,
    },

    formNumber: {
        type: String,
        required: true,
        unique: true,
    },
    formDateIssued: {
        type: Date,
        default: Date.now,
    },
    expirationDate: {
        type: Date,
        default: null
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },

});

export default formSchema;