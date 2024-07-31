import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const nameSchema = new Schema({
    first: {
        type: String,
        required: true,
    },
    middle: {
        type: String,
    },
    last: {
        type: String,
        required: true,
    },
    suffix: {
        type: String,
    }
});

const nonResidentSchema = new Schema({
    name: nameSchema,
    dateOfBirth: {
        type: Date,
        required: true,
    },
    placeOfBirth: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
})

const borrowSchema = new Schema({
    residentID: {
        type: Schema.Types.ObjectId,
        ref: 'Resident',
    },
    isResident: {
        type: Boolean,
        default: true,
    },
    nonResident: {
        type: nonResidentSchema,
        default: null,
    },
    reason: {
        type: String,
        required: true,
    },
    dateBorrowed: {
        type: Date,
        required: true,
        default: Date.now,
    },
    placeWent: {
        type: String,
        required: true,
    },
    vehicle: {
        type: String,
        required: true,
    },
    numberOfPassengers: {
        type: Number,
        required: true,
        default: 1,
    },
});

borrowSchema.plugin(mongoosePaginate);

export default borrowSchema;