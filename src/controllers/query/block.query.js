import BlockedLog from "../../models/BlockedLog.js";
import Resident from "../../models/Resident.js";

export const getResidentBlockLog = async (req, res) => {
    const { id } = req.query;
    try {
        const resident = await Resident.findById(id);
        if (!resident) {
            return res.status(404).json({
                message: "Resident not found",
            });
        }
        const blockLogs = await BlockedLog.find({ residentID: id });
        res.status(200).json({
            data: blockLogs,
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to get resident block logs",
            function: "getResidentBlockLogs"
        });
        res.status(409).json({ 
            error: error.message,
            message: "Failed to get resident block logs"
        });
    }
}

export const getAllBlockLog = async (req, res) => {
    try {
        const { limit = 50, page = 1 } = req.query;

        const options = {
            limit: parseInt(limit),
            skip: (parseInt(page) - 1) * parseInt(limit),
            match: {
                isBlocked: true
            }
        };

        const blockLogs = await BlockedLog.find({}, null, options);
        const totalLogs = await BlockedLog.countDocuments();

        res.status(200).json({
            data: blockLogs,
            totalPages: Math.ceil(totalLogs / limit),
            currentPage: parseInt(page),
            totalLogs
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to get all block logs",
            function: "getAllBlockLog"
        });
        res.status(409).json({ 
            error: error.message,
            message: "Failed to get all block logs"
        });
    }
};