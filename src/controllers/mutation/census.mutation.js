import Household from "../../models/Household.js";
import Family from "../../models/Family.js";
import Census from "../../models/Census.js";
import Resident from "../../models/Resident.js";

export const createCensus = async (req, res) => {
    try {
        const newCensus = await Census.create({
            createdAt: new Date(),
        });
        if(!newCensus) {
            return res.status(409).json({
                message: "Failed to create census"
            });
        }
        res.status(201).json({
            message: "Census created successfully",
            census: newCensus
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to create census",
            function: "createCensus"
        })
        res.status(409).json({ 
            error: error.message,
            message: "Failed to create census"
        });
    }
}

export const createHousehold = async (req, res) => {
    const { address, head } = req.body;
    const censusID = req.params.id;
    try {
        //check if head (resident) exists
        const query = {
            'name.first': new RegExp(`^${head.name.first}$`, 'i'),
            'name.last': new RegExp(`^${head.name.last}$`, 'i'),
            'name.middle': new RegExp(`^${head.name.middle}$`, 'i'),
            'dateOfBirth': new Date(head.dateOfBirth)
        };
        
        // Add `suffix` to the query conditionally if it exists
        if (head.name.suffix !== null && head.name.suffix !== undefined) {
            query['name.suffix'] = new RegExp(`^${head.name.suffix}$`, 'i');
        }
        
        const resident = await Resident.findOne(query);
        console.log(new Date(head.dateOfBirth));
        console.log(resident);

        let householdHead = null;
        if(!resident){
            householdHead = await Resident.create({
                ...head,
                address: address,
            });
            if(!householdHead) {
                return res.status(409).json({
                    message: "Failed to create household head"
                });
            }
            console.log("NEW RESIDENT CREATED")
        } else {
            //update resident
            householdHead = await Resident.findByIdAndUpdate(resident._id, {
                ...head,
                address: address
            }, {new: true});
            if(!householdHead) {
                return res.status(409).json({
                    message: "Failed to update household head"
                });
            }
            console.log("RESIDENT UPDATED")
        }

        //check if household already exists
        const householdExists = await Household.findOne({
            head: householdHead._id,
            censusID
        });

        if(householdExists) {
            return res.status(409).json({
                message: "Household already exists",
                data: householdExists
            });
        }

        //create household
        const household = await Household.create({
            address,
            head: householdHead._id,
            censusID
        });

        res.status(201).json({
            message: "Household created successfully",
            data: household
        })
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to create household",
            function: "createHousehold"
        })
        res.status(409).json({ 
            error: error.message,
            message: "Failed to create household"
        });
    }
}