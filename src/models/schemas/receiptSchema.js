import { Schema } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const itemSchema = new Schema({
    name: {
        type: String,
        default: null
    },
    amount: {
        type: Number,
        default: 0
    },
    ORNumber: {
        type: String,
        required: true
    },
    nature: {
        type: String,
        default: null
    },
    date: {
        type: Date,
        default: null
    }
});


const receiptSchema = new Schema({
    bookletNumber: {
        type: String,
        required: true,
        unique: true
    },
    startOfOR: {
        type: String,
        required: true
    },
    endOfOR: {
        type: String,
        required: true
    },
    preparedBy: {
        type: String,
        required: true
    },
    items: {
        type: [itemSchema],
        default: []
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

receiptSchema.plugin(mongoosePaginate);


export default receiptSchema;