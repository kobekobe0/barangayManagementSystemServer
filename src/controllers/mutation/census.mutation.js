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
    try{
        //check if head (resident) exists
        const query = {
            'name.first': new RegExp(`^${head.name.first}$`, 'i'),
            'name.last': new RegExp(`^${head.name.last}$`, 'i'),
            'name.middle': new RegExp(`^${head.name.middle}$`, 'i'),
            'dateOfBirth': new Date(head.dateOfBirth)
        };
        
        //// Add `suffix` to the query conditionally if it exists
        if (head.name.suffix !== null && head.name.suffix !== undefined) {
            query['name.suffix'] = new RegExp(`^${head.name.suffix}$`, 'i');
        }
        
        const resident = await Resident.findOne(query);

        let householdHead;
        // if resident does not exist, create resident
        if(!resident) {
            householdHead = await Resident.create({
                ...head,
                address: address,
            });
            console.log("Resident created successfully")
        } else {
            householdHead = await Resident.findByIdAndUpdate(resident._id, {
                ...head,
                address: address
            }, {new: true});
            console.log("Resident updated successfully")
        }

        //check if household already exists (current census)
        const householdExistsCurrent = await Household.findOne({
            head: householdHead._id,
            address,
            censusID
        });

        if(householdExistsCurrent) {
            // return household that already exists
            console.log("Household already exists in the current census")
            return res.status(201).json({
                message: "Household already exists in the current census, redirecting to this household",
                data: householdExistsCurrent
            });
        }

        //create new household
        const householdNew = await Household.create({
            address,
            head: householdHead._id,
            censusID
        });

        // check if there are other census
        const censusData = await Census.find().sort({createdAt: -1});

        //check lenght of censusData
        if(censusData.length <= 1) {
            return res.status(201).json({
                message: "Household created successfully",
                data: householdNew
            });
        }

        //COPY HOUSEHOLD FROM LAST CENSUS

        // check if household already exists in last census
        const oldHousehold = await Household.findOne({
            head: householdHead._id,
            address,
            censusID: censusData[1]._id
        });

        if(oldHousehold) {
            // copy household families to new household
            const families = await Family.find({ householdID: oldHousehold._id });
            families.forEach(async (family) => {
                await Family.create({
                    householdID: householdNew._id,
                    members: family.members
                });
            });
        }
        
        return res.status(201).json({
            message: "Household created successfully",
            data: householdNew
        });
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