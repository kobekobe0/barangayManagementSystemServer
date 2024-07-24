import { Schema } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const itemSchema = new Schema({
    payor: {
        type: String,
        default: null
    },
    individual: {
        type: Number,
        default: 0
    },
    corporation: {
        type: Number,
        default: 0
    },
    rpt: {
        type: Number,
        default: 0
    },
    others: {
        type: Number,
        default: 0
    },
    CTCNumber: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: null
    }
});


const cedulaSchema = new Schema({
    bookletNumber: {
        type: String,
        required: true,
        unique: true
    },
    startOfCTC: {
        type: String,
        required: true
    },
    endOfCTC: {
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
    dateFrom: {
        type: Date,
        default: Date.now
    },
    dateTo: {
        type: Date,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

cedulaSchema.plugin(mongoosePaginate);


export default cedulaSchema;