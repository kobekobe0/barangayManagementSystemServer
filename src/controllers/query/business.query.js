import Business from "../../models/Business.js";
import Form from "../../models/Form.js";
import Resident from "../../models/Resident.js";


export const getAllBusinesses = async (req, res) => {
    const { name, status, residentID } = req.query;
    const query = {
        isDeleted: false
    };
    if(name) query.businessName = { $regex: name, $options: 'i' }

    if(status){
        if(status === 'expired') query.isExpired = true;
        else if(status === 'active') {
            query.isExpired = false;
            query.isClosed = false;
        } else if(status === 'closed') query.isClosed = true;
    }

    if(residentID) query.residentID = residentID;

    try {
        const businesses = await Business.find(query).populate('residentID', 'name');        
        return res.status(200).json({
            message: 'Businesses fetched successfully',
            data: businesses,
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to get businesses",
            function: "getAllBusinesses"
        })
        return res.status(409).json({ 
            error: error.message,
            message: "Failed to get businesses"
        });
    }
}

export const getBusinessNumbers = async (req, res) => {
    try {
        const totalBusinesses = await Business.countDocuments({ isDeleted: false });
        const activeBusinesses = await Business.countDocuments({ isExpired: false, isClosed: false, isDeleted: false });
        const expiredBusinesses = await Business.countDocuments({ isExpired: true, isDeleted: false });
        const closedBusinesses = await Business.countDocuments({ isClosed: true, isDeleted: false });

        console.log({
            totalBusinesses,
            activeBusinesses,
            expiredBusinesses,
            closedBusinesses,
        })

        return res.status(200).json({
            message: 'Business numbers fetched successfully',
            data: {
                totalBusinesses,
                activeBusinesses,
                expiredBusinesses,
                closedBusinesses,
            },
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to get business numbers",
            function: "getBusinessNumbers"
        })
        return res.status(409).json({ 
            error: error.message,
            message: "Failed to get business numbers"
        });
    }
}

export const getBusiness = async (req, res) => {
    const { id } = req.params;
    try {
        const business = await Business.findById(id).populate('residentID', 'name isBlocked address dateOfBirth placeOfBirth').populate('formIDs');
        if (business) {
            return res.status(200).json({
                data: business,
            });
        } else {
            return res.status(404).json({
                error: 'Business not found',
                message: "No business found with the provided ID"
            });
        }
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to get business",
            function: "getBusiness"
        })
        return res.status(409).json({ 
            error: error.message,
            message: "Failed to get business"
        });
    }
}