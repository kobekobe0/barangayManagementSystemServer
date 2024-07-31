import IndigentHolder from "../../models/IndigentHolder.js";
import Indigent from "../../models/Indigent.js";
import Resident from "../../models/Resident.js";
import mongoose from "mongoose";
import formatIndigent from "../../helper/formatDataIndigent.js";
import generateForm from "../../helper/generateForm.js";

export const getLatestIndigentHolder = async (req, res) => {
    try {
        //check if there is an existing indigent holder
        const existingHolder = await IndigentHolder.find()
        if(existingHolder.length === 0){
            //create a new indigent holder
            const indigentHolder = await IndigentHolder.create({amount: 10000})
            return res.status(200).json({
                data: indigentHolder
            })
        }
        const indigentHolder = await IndigentHolder.findOne().sort({createdAt: -1})
        return res.status(200).json({
            data: indigentHolder
        })
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to get Indigent Holder",
            function: "getIndigentHolder"
        })
        return res.status(409).json({
            error: error.message,
            message: "Failed to get Indigent Holder"
        })
    }
}

export const getIndigentHolders = async (req, res) => {
    try {
        const indigentHolders = await IndigentHolder.find().sort({createdAt: -1})
        return res.status(200).json({
            data: indigentHolders
        })
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to get Indigent Holders",
            function: "getIndigentHolders"
        })
        return res.status(409).json({
            error: error.message,
            message: "Failed to get Indigent Holders"
        })
    }
}

export const getNumbers = async (req, res) => {
    const {id} = req.params
    try {
        let totalCurrentAmount = []
        const totalCurrentIndigents = await Indigent.countDocuments({holderID: id})
        totalCurrentAmount = await Indigent.aggregate([
            {
                $match: {
                    holderID: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$amount"
                    }
                }
            }
        ])
        const totalAll = await Indigent.countDocuments()

        if(totalCurrentAmount.length === 0){
            totalCurrentAmount.push({total: 0})
        }

        return res.status(200).json({
            data: {
                total: totalCurrentIndigents,
                totalAmount: totalCurrentAmount[0].total,
                totalAll
            }
        })
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to get Indigent Numbers",
            function: "getIndigentNumbers"
        })
        return res.status(409).json({
            error: error.message,
            message: "Failed to get Indigent Numbers"
        })
    }
}

export const getpatientLastIndigentDate = async (req, res) => {
    const {id} = req.params
    try {
        const resident = await Resident.findById(id)
        if(!resident){
            return res.status(404).json({
                message: 'Resident not found'
            })
        }
        const indigent = await Indigent.findOne({patient: id}).sort({approvedAt: -1})
        //only return the date
        if(!indigent) {
            return res.status(200).json({
                data: 'N/A',
                isBlocked: resident.isBlocked
            })
        }
        return res.status(200).json({
            data: new Date(indigent.approvedAt).toLocaleString('en-us', {year: 'numeric', month:'long', day:'2-digit'}) || 'N/A',
            isBlocked: resident.isBlocked
        })
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to get Indigent Numbers",
            function: "getIndigentNumbers"
        })
        return res.status(409).json({
            error: error.message,
            message: "Failed to get Indigent Numbers"
        })
    }
}

export const getIndigents = async (req, res) => {
    try {
        const indigents = await Indigent.find()
            .sort({ approvedAt: -1 })
            .limit(15)
            .populate('patient', 'name');

        return res.status(200).json({
            data: indigents
        })
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to get Indigents",
            function: "getIndigents"
        })
        return res.status(409).json({
            error: error.message,
            message: "Failed to get Indigents"
        })
    }
}

export const searchIndigent = async (req, res) => {
    const { first = "", last="", middle="" } = req.query;

    let matchStage = {};
    if (first || last || middle) {
        matchStage.$or = [];
        if (first) {
            matchStage.$or.push({ "patient.name.first": { $regex: first, $options: 'i' } });
        }
        if (middle) {
            matchStage.$or.push({ "patient.name.middle": { $regex: middle, $options: 'i' } });
        }
        if (last) {
            matchStage.$or.push({ "patient.name.last": { $regex: last, $options: 'i' } });
        }
    }

    try {
        const indigents = await Indigent.aggregate([
            {
                $lookup: {
                    from: "residents",
                    localField: "patient",
                    foreignField: "_id",
                    as: "patient"
                }
            },
            {
                $lookup: {
                    from: "residents", // replace with the actual name of the User collection
                    localField: "receivedBy",
                    foreignField: "_id",
                    as: "receivedBy"
                }
            },
            { $unwind: "$patient" },
            { $unwind: "$receivedBy" },
            { $match: matchStage },
            { $sort: { approvedAt: -1 } },
        ]);

        return res.status(200).json({
            data: indigents
        })
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to get Indigents",
            function: "getIndigents"
        })
        return res.status(409).json({
            error: error.message,
            message: "Failed to get Indigents"
        })
    }
}


export const getResidentIndigentHistory = async (req, res) => {
    const { id } = req.params;
    try {
        const indigents = await Indigent.find({patient: id})
            .sort({ approvedAt: -1 })
            .populate('patient', 'name');

        return res.status(200).json({
            data: indigents
        })
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to get Indigents",
            function: "getIndigents"
        })
        return res.status(409).json({
            error: error.message,
            message: "Failed to get Indigents"
        })
    }
}


export const printIndigents = async (req, res) => {
    const {id} = req.params;

    try {
        const indigent = await Indigent.find({
            holderID: id 
        })
        .sort({approvedAt: -1})
        .populate('patient', 'name')

        await formatIndigent(indigent).then(async (data) => {
            const docxFile = await generateForm({indigents: data.arr, total: data.totalAmount}, 'indigent');
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            res.setHeader('Content-Disposition', `attachment; filename=${id}.docx`);
            return res.send(docxFile);
        })
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to get Indigents",
            function: "getIndigents"
        })
        return res.status(409).json({
            error: error.message,
            message: "Failed to get Indigents"
        })
    }
}