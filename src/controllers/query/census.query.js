import Census from "../../models/Census.js";
import Resident from "../../models/Resident.js";
import Household from "../../models/Household.js";
import Family from "../../models/Family.js";

export const getAllCensus = async (req, res) => {
    try {
        const census = await Census.find();
        if(!census) {
            return res.status(404).json({
                message: "Census not found"
            });
        }
        res.status(200).json({
            message: "Census found",
            data: census
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to get census",
            function: "getAllCensus"
        });
        res.status(409).json({
            error: error.message,
            message: "Failed to get census"
        });
    }
}