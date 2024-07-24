import Resident from '../../models/Resident.js';
import BlockedLog from '../../models/BlockedLog.js';

//TODO: turn all '' or ' ' to null, make a function for this

export const createResident = async (req, res) => {
    let resident = req.body;
    try{
        //TODO: handle picture upload

        //check if resident already exists
        const query = {
            'name.first': new RegExp(`^${resident.name.first}$`, 'i'),
            'name.last': new RegExp(`^${resident.name.last}$`, 'i'),
            'name.middle': new RegExp(`^${resident.name.middle}$`, 'i'),
            'dateOfBirth': new Date(resident.dateOfBirth)
        };

        //// ADD `suffix` to the query conditionally if it exists
        if (resident.name.suffix !== null && resident.name.suffix !== undefined) {
            query['name.suffix'] = new RegExp(`^${resident.name.suffix}$`, 'i');
        }

        const existingResident = await Resident.findOne(query);
        if(existingResident) {
            return res.status(409).json({
                message: "Resident already exists"
            });
        }

        const newResident = await Resident.create(resident);
        const newBlockLog = await BlockedLog.create({ residentID: newResident._id, isBlocked: false, actionDate: new Date() });
        

        //update resident BlockedLog
        const updatedResidentBlock = await Resident.findByIdAndUpdate(newResident._id, { blocked: newBlockLog._id }, { new: true })
        
        return res.status(201).json({
            message: "Resident created successfully",
            resident: updatedResidentBlock
        });

    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to create resident",
            function: "createResident"
        })
        return res.status(409).json({ 
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
        return res.status(200).json({
            message: "Resident picture updated successfully",
            resident: updatedResident
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to update resident picture",
            function: "updateResidentPicture"
        })
        return res.status(409).json({ 
            error: error.message,
            message: "Failed to update resident picture"
        });
    }
}

export const updateResident = async (req, res) => {
    const { id } = req.params;
    const resident = req.body;
    try {
        const residentToUpdate = { ...resident };
        delete residentToUpdate.picture;
        
        const updatedResident = await Resident.findByIdAndUpdate(
            id,
            residentToUpdate,
            { new: true }
        );
        
        return res.status(200).json({
            message: "Resident updated successfully",
            resident: updatedResident
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to update resident",
            function: "updateResident"
        })
        return res.status(409).json({ 
            error: error.message,
            message: "Failed to update resident"
        });
    }
}

export const deleteResident = async (req, res) => {
    const { id } = req.query;
    try {
        const resident = await Resident.findByIdAndUpdate(id, {
            isDeleted: true
        });
        const blockLog = await BlockedLog.findOneAndUpdate({ residentID: id }, { isDeleted: true });
        //set isDeleted to true
        return res.status(200).json({
            message: "Resident deleted successfully"
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to delete resident",
            function: "deleteResident"
        })
        return res.status(409).json({ 
            error: error.message,
            message: "Failed to delete resident"
        });
    }
}