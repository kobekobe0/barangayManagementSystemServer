import Household from "../../models/Household.js";
import Family from "../../models/Family.js";
import Census from "../../models/Census.js";
import Resident from "../../models/Resident.js";
import BlockedLog from "../../models/BlockedLog.js";
import IDENTIFIERS from "../../constants/identifiers.js";

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
    let { address } = req.body;
    const { head } = req.body;
    const censusID = req.params.id;
    try{
        //put identifier and isUnique to default values
        let isUnique = true;
        let identifier = undefined;

        //CHECK if head (resident) exists
        const query = {
            'name.first': new RegExp(`^${head.name.first}$`, 'i'),
            'name.last': new RegExp(`^${head.name.last}$`, 'i'),
            'name.middle': new RegExp(`^${head.name.middle}$`, 'i'),
            'dateOfBirth': new Date(head.dateOfBirth)
        };
        
        //// ADD `suffix` to the query conditionally if it exists
        if (head.name.suffix !== null && head.name.suffix !== undefined) {
            query['name.suffix'] = new RegExp(`^${head.name.suffix}$`, 'i');
        }
        
        const resident = await Resident.findOne(query);
        
        let householdHead;
        // if resident does not exist, CREATE resident
        if(!resident) {
            householdHead = await Resident.create({
                ...head,
                address,
            });
            //TODO: Create blocklog
            await BlockedLog.create({
                residentID: householdHead._id,
            });

            console.log("Resident created successfully")
        } else {
            householdHead = await Resident.findByIdAndUpdate(resident._id, {
                ...head,
                address
            }, {new: true});
            console.log("Resident updated successfully")
        }

        console.log("PASSED: CHECK if head (resident) exists")

        //CHECK if household already exists (current census) - identifier and isUnique is not included because it will be added later
        const householdExistsCurrent = await Household.findOne({
            head: householdHead._id,
            address,
            censusID
        });

        if(householdExistsCurrent) {
            // RETURN household that already exists
            console.log("Household already exists in the current census")
            return res.status(201).json({
                message: "Household already exists in the current census, redirecting to this household",
                data: householdExistsCurrent
            });
        }

        console.log("PASSED: CHECK if household already exists (current census)")

        // CHECK IF ADDRESS IS UNIQUE
        
        //GET all households with the same address
        const sameAddressHouseholds = await Household.find({
            address: address
        });

        console.log("SAME ADDRESS HOUSEHOLDS: ", sameAddressHouseholds)

        if(sameAddressHouseholds.length == 1) {
            //UPDATE isUnique and identifier of the household
            await Household.findByIdAndUpdate(sameAddressHouseholds[0]._id, {
                isUnique: false,
                identifier: `${IDENTIFIERS[0]}`
            });
            isUnique = false;
            identifier = `${IDENTIFIERS[1]}`;
        } else if(sameAddressHouseholds.length > 1) {
            isUnique = false;
            identifier = `${IDENTIFIERS[sameAddressHouseholds.length - 1]}`;
        } else {
            console.log("No household with the same address")
        }

        console.log("PASSED: CHECK IF ADDRESS IS UNIQUE ", + isUnique, identifier)

        // CHECK if there are other census
        const censusData = await Census.find().sort({createdAt: -1});

        //CREATE new household

        console.log("Creating new household ", address, householdHead._id, censusID, isUnique, identifier)

        const householdNew = await Household.create({
            address,
            head: householdHead._id,
            censusID,
            isUnique,
            identifier
        })

        if(!householdNew) {
            return res.status(409).json({
                message: "Failed to create household"
            });
        }

        console.log("PASSED: Creating new household ", householdNew)

        //CHECK lenght of censusData
        if(censusData.length <= 1) {
            console.log("No other census")
            return res.status(201).json({
                message: "Household created successfully",
                data: householdNew
            });
        }

        //COPY HOUSEHOLD FROM LAST CENSUS

        // CHECK if household already exists in last census
        const oldHousehold = await Household.findOne({
            head: householdHead._id,
            address,
            censusID: censusData[1]._id
        });

        if(oldHousehold) {
            // COPY household families to new household
            console.log("Household already exists in the last census, copying families to new household")
            const families = await Family.find({ householdID: oldHousehold._id });
            families.forEach(async (family) => {
                await Family.create({
                    householdID: householdNew._id,
                    members: family.members
                });
            });
            console.log("Household copied successfully")
        }

        console.log("PASSED: COPY HOUSEHOLD FROM LAST CENSUS")
        
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


export const createFamily = async (req, res) => {
    const householdID = req.params.id;
    try {
        const family = await Family.create({
            householdID
        });
        if(!family) {
            return res.status(409).json({
                message: "Failed to create family"
            });
        }
        res.status(201).json({
            message: "Family created successfully",
            data: family
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to create family",
            function: "createFamily"
        })
        res.status(409).json({ 
            error: error.message,
            message: "Failed to create family"
        });
    }
}

export const deleteFamily = async (req, res) => {
    const familyID = req.params.id;
    try {
        const family = await Family.findByIdAndDelete(familyID);
        if(!family) {
            return res.status(404).json({
                message: "Family not found"
            });
        }
        res.status(200).json({
            message: "Family deleted successfully",
            success: true
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to delete family",
            function: "deleteFamily"
        });
        res.status(409).json({
            error: error.message,
            message: "Failed to delete family"
        });
    }
}



