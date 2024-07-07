import Resident from '../../models/Resident.js';
import BlockedLog from '../../models/BlockedLog.js';

//TODO: turn all '' or ' ' to null, make a function for this

export const createResident = async (req, res) => {
    let resident = req.body;
    try{
        //TODO: handle picture upload

        const newResident = await Resident.create(resident);
        const newBlockLog = await BlockedLog.create({ residentID: newResident._id, isBlocked: false, actionDate: new Date() });
        

        //update resident BlockedLog
        const updatedResidentBlock = await Resident.findByIdAndUpdate(newResident._id, { blocked: newBlockLog._id }, { new: true })
        
        res.status(201).json({
            message: "Resident created successfully",
            resident: updatedResidentBlock
        });

    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to create resident",
            function: "createResident"
        })
        res.status(409).json({ 
            error: error.message,
            message: "Failed to create resident"
        });
    }

}

export const updateResidentPicture = async (req, res) => {
    const { id } = req.params;
    try {
        //console.log(req.filename)
        const picturePath = `images/${req.filename}`;
        const updatedPpfp = { picture: picturePath };
        const updatedResident = await Resident.findByIdAndUpdate(id, updatedPpfp, { new: true });
        res.status(200).json({
            message: "Resident picture updated successfully",
            resident: updatedResident
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to update resident picture",
            function: "updateResidentPicture"
        })
        res.status(409).json({ 
            error: error.message,
            message: "Failed to update resident picture"
        });
    }
}

export const updateResident = async (req, res) => {
    const { id } = req.params;
    const resident = req.body;
    try {
        const updatedResident = await Resident.findByIdAndUpdate(id, resident, { new: true });
        res.status(200).json({
            message: "Resident updated successfully",
            resident: updatedResident
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to update resident",
            function: "updateResident"
        })
        res.status(409).json({ 
            error: error.message,
            message: "Failed to update resident"
        });
    }
}

export const deleteResident = async (req, res) => {
    const { id } = req.query;
    try {
        await Resident.findByIdAndDelete(id);
        res.status(200).json({
            message: "Resident deleted successfully"
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to delete resident",
            function: "deleteResident"
        })
        res.status(409).json({ 
            error: error.message,
            message: "Failed to delete resident"
        });
    }
}