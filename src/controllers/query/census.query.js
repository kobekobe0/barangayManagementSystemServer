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



// ------ Households ------

export const getHousehold = async (req, res) => {
    const householdID = req.params.id;
    try {
        const household = await Household.findById(householdID).populate("head");
        if(!household) {
            return res.status(404).json({
                message: "Household not found"
            });
        }
        res.status(200).json({
            message: "Household found",
            data: household
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to get household",
            function: "getHousehold"
        });
        res.status(409).json({
            error: error.message,
            message: "Failed to get household"
        });
    }
}


// ------ Families ------
export const getHouseholdFamilies = async (req, res) => {
    const householdID = req.params.id;
    try {
        const families = await Family.find({ householdID }).populate("members");
        if(!families) {
            return res.status(404).json({
                message: "Families not found"
            });
        }
        res.status(200).json({
            message: "Families found",
            data: families
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to get families",
            function: "getHouseholdFamilies"
        });
        res.status(409).json({
            error: error.message,
            message: "Failed to get families"
        });
    }
}