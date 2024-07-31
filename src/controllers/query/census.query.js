import Census from "../../models/Census.js";
import Resident from "../../models/Resident.js";
import Household from "../../models/Household.js";
import Family from "../../models/Family.js";
import mongoose from "mongoose";

export const getAllCensus = async (req, res) => {
    try {
        const census = await Census.find();
        if(!census) {
            return res.status(404).json({
                message: "Census not found"
            });
        }
        return res.status(200).json({
            message: "Census found",
            data: census
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to get census",
            function: "getAllCensus"
        });
        return res.status(409).json({
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
        return res.status(200).json({
            message: "Household found",
            data: household
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to get household",
            function: "getHousehold"
        });
        return res.status(409).json({
            error: error.message,
            message: "Failed to get household"
        });
    }
}

export const getHouseholds = async (req, res) => {
    const {first ='', last = '', middle= '', streetName = '', sitio = '', apartment='', householdNumber = ''} = req.query;
    try {
        // Build the $match object dynamically
        const match = { censusID: new mongoose.Types.ObjectId(req.params.id) };

        if (first) match["head.name.first"] = { $regex: first, $options: 'i' };
        if (last) match["head.name.last"] = { $regex: last, $options: 'i' };
        if (middle) match["head.name.middle"] = { $regex: middle, $options: 'i' };
        if (streetName) match["address.streetName"] = { $regex: streetName, $options: 'i' };
        if (sitio) match["address.sitio"] = { $regex: sitio, $options: 'i' };
        if (apartment) match["address.apartment"] = { $regex: apartment, $options: 'i' };
        if (householdNumber) match["address.householdNumber"] = { $regex: householdNumber, $options: 'i' };


        const households = await Household.aggregate([
            {
                $lookup: {
                    from: "residents", // replace with the actual name of the collection that head references
                    localField: "head",
                    foreignField: "_id",
                    as: "head"
                }
            },
            { $unwind: "$head" },
            { $match: match }
        ]);
        
        return res.status(200).json({
            message: "Households found",
            data: households
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to get households",
            function: "getHouseholds"
        });
        return res.status(409).json({
            error: error.message,
            message: "Failed to get households"
        });
    }
};

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
        return res.status(200).json({
            message: "Families found",
            data: families
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to get families",
            function: "getHouseholdFamilies"
        });
        return res.status(409).json({
            error: error.message,
            message: "Failed to get families"
        });
    }
}