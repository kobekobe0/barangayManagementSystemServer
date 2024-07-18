import Business from "../../models/Business.js";
import Form from "../../models/Form.js";
import Resident from "../../models/Resident.js";


export const getAllBusinesses = async (req, res) => {
    const { name, status, residentID } = req.query;
    const query = {};
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
        res.status(200).json({
            message: 'Businesses fetched successfully',
            data: businesses,
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to get businesses",
            function: "getAllBusinesses"
        })
        res.status(409).json({ 
            error: error.message,
            message: "Failed to get businesses"
        });
    }
}

export const getBusinessNumbers = async (req, res) => {
    try {
        const totalBusinesses = await Business.countDocuments();
        const activeBusinesses = await Business.countDocuments({ isExpired: false, isClosed: false });
        const expiredBusinesses = await Business.countDocuments({ isExpired: true });
        const closedBusinesses = await Business.countDocuments({ isClosed: true });

        res.status(200).json({
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
        res.status(409).json({ 
            error: error.message,
            message: "Failed to get business numbers"
        });
    }
}