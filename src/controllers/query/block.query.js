import BlockedLog from "../../models/BlockedLog.js";
import Resident from "../../models/Resident.js";

export const getResidentBlockLog = async (req, res) => {
    const { id } = req.query;
    try {
        const resident = await Resident.findOne({ _id: id, isDeleted: false });
        if (!resident) {
            return res.status(404).json({
                message: "Resident not found",
            });
        }
        const blockLogs = await BlockedLog.findOne({ residentID: id });
        return res.status(200).json({
            data: blockLogs,
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to get resident block logs",
            function: "getResidentBlockLogs"
        });
        return res.status(409).json({ 
            error: error.message,
            message: "Failed to get resident block logs"
        });
    }
}

export const getAllBlockLog = async (req, res) => {
    try {
        const { first = "", last="", middle="" } = req.query;

        let matchStage = {isBlocked: true};
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

        const blockLogs = await BlockedLog.aggregate([
            {
                $lookup: {
                    from: "residents",
                    localField: "residentID",
                    foreignField: "_id",
                    as: "residentID"
                }
            },
            { $unwind: "$residentID" },
            {
                $project: {
                    "residentID.name": 1,
                    "residentID._id": 1,
                    isBlocked: 1,
                    dateBlocked: 1,
                    dateUnblocked: 1,
                    reason: 1,
                    isDeleted: 1
                }
            },
            { $match: matchStage },
            { $sort: { dateBlocked: -1 } },
        ]);

        const totalLogs = blockLogs.length;

        return res.status(200).json({
            data: blockLogs,
            totalLogs
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to get all block logs",
            function: "getAllBlockLog"
        });
        return res.status(409).json({ 
            error: error.message,
            message: "Failed to get all block logs"
        });
    }
};