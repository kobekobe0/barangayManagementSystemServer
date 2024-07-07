import BlockLog from '../../models/BlockedLog.js';
import Resident from '../../models/Resident.js';

export const blockResident = async (req, res) => {
    const {id} = req.params;
    const {reason} = req.body;
    try {
        const resident = await Resident.findById(id);
        if (!resident) {
            return res.status(404).json({
                message: "Resident not found",
            });
        }
        
        const updateBlockLog = await BlockLog.findOneAndUpdate({ residentID: id }, { isBlocked: true, dateBlocked: new Date(), reason: reason }, { new: true });
        const updatedResident = await Resident.findByIdAndUpdate(id, { isBlocked: true }, { new: true });

        res.status(201).json({
            message: "Resident blocked successfully",
            blockLog: updatedResident
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to block resident",
            function: "blockResident"
        })
        res.status(409).json({ 
            error: error.message,
            message: "Failed to block resident"
        });
    }
}


export const unblockResident = async (req, res) => {
    const {id} = req.params;
    try {
        const resident = await Resident.findById(id);
        if (!resident) {
            return res.status(404).json({
                message: "Resident not found",
            });
        }
        
        const updateBlockLog = await BlockLog.findOneAndUpdate({ residentID: id }, { isBlocked: false, dateUnblocked: new Date() }, { new: true });
        const updatedResident = await Resident.findByIdAndUpdate(id, { isBlocked: false }, { new: true });

        res.status(201).json({
            message: "Resident unblocked successfully",
            blockLog: updateBlockLog
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to unblock resident",
            function: "unblockResident"
        })
        res.status(409).json({ 
            error: error.message,
            message: "Failed to unblock resident"
        });
    }
}
