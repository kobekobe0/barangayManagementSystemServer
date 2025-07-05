import BlockLog from '../../models/BlockedLog.js';
import Resident from '../../models/Resident.js';

export const blockResident = async (req, res) => {
    const {id} = req.params;
    const {reason} = req.body;
    try {
        const resident = await Resident.findById(id);
        if (!resident) {
            return res.status(404).json({
                message: "Resident not found",
            });
        }
        
        const updateBlockLog = await BlockLog.findOneAndUpdate({ residentID: id }, { isBlocked: true, dateBlocked: new Date(), reason: reason }, { new: true });
        const updatedResident = await Resident.findByIdAndUpdate(id, { isBlocked: true }, { new: true });

        return res.status(201).json({
            message: "Resident blocked successfully",
            blockLog: updatedResident
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to block resident",
            function: "blockResident"
        })
        return res.status(409).json({ 
            error: error.message,
            message: "Failed to block resident"
        });
    }
}


export const unblockResident = async (req, res) => {
    const {id} = req.params;
    try {
        const resident = await Resident.findById(id);
        if (!resident) {
            return res.status(404).json({
                message: "Resident not found",
            });
        }
        
        const updateBlockLog = await BlockLog.findOneAndUpdate({ residentID: id }, { isBlocked: false, dateUnblocked: new Date() }, { new: true });
        const updatedResident = await Resident.findByIdAndUpdate(id, { isBlocked: false }, { new: true });

        return res.status(201).json({
            message: "Resident unblocked successfully",
            blockLog: updateBlockLog
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to unblock resident",
            function: "unblockResident"
        })
        return res.status(409).json({ 
            error: error.message,
            message: "Failed to unblock resident"
        });
    }
}


export const searchPotentialDuplicates = async (req, res) => {
    const { first, last, middle, suffix } = req.query;
    

    console.log(req.query)

    try {
        if (!first || !last) {
            return res.status(400).json({
                message: "First name and last name are required for search"
            });
        }

        // Build search query with multiple matching strategies
        const searchQueries = [];
        
        // Exact match query
        const exactQuery = {
            'name.first': new RegExp(`^${first}$`, 'i'),
            'name.last': new RegExp(`^${last}$`, 'i'),
            isDeleted: false
        };
        
        if (middle) {
            exactQuery['name.middle'] = new RegExp(`^${middle}$`, 'i');
        }
        
        if (suffix) {
            exactQuery['name.suffix'] = new RegExp(`^${suffix}$`, 'i');
        }
        
        searchQueries.push(exactQuery);
        
        // Fuzzy match query (without middle name/suffix)
        const fuzzyQuery = {
            'name.first': new RegExp(`^${first}$`, 'i'),
            'name.last': new RegExp(`^${last}$`, 'i'),
            isDeleted: false
        };
        
        searchQueries.push(fuzzyQuery);
        
        // Name swap query (in case first/last are swapped)
        const swapQuery = {
            'name.first': new RegExp(`^${last}$`, 'i'),
            'name.last': new RegExp(`^${first}$`, 'i'),
            isDeleted: false
        };
        
        searchQueries.push(swapQuery);
        
        // Execute all search queries
        const searchPromises = searchQueries.map(query => 
            Resident.find(query)
                .populate('blocked', 'isBlocked reason dateBlocked')
                .select('name address age isBlocked')
                .limit(10)
        );
        
        const searchResults = await Promise.all(searchPromises);
        
        // Combine and deduplicate results
        const allResults = searchResults.flat();
        const uniqueResults = [];
        const seenIds = new Set();
        
        for (const resident of allResults) {
            if (!seenIds.has(resident._id.toString())) {
                seenIds.add(resident._id.toString());
                
                // Calculate confidence level
                let confidence = 'low';
                if (resident.name.first.toLowerCase() === first.toLowerCase() && 
                    resident.name.last.toLowerCase() === last.toLowerCase()) {
                    
                    if (middle && resident.name.middle && 
                        resident.name.middle.toLowerCase() === middle.toLowerCase()) {
                        confidence = 'high';
                    } else if (!middle || !resident.name.middle) {
                        confidence = 'medium';
                    }
                }
                
                uniqueResults.push({
                    ...resident.toObject(),
                    confidence
                });
            }
        }
        
        // Sort by confidence (high -> medium -> low)
        const confidenceOrder = { 'high': 3, 'medium': 2, 'low': 1 };
        uniqueResults.sort((a, b) => confidenceOrder[b.confidence] - confidenceOrder[a.confidence]);
        
        return res.status(200).json({
            data: uniqueResults.slice(0, 10), // Limit to 10 results
            total: uniqueResults.length
        });
        
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to search potential duplicates",
            function: "searchPotentialDuplicates"
        });
        return res.status(500).json({ 
            error: error.message,
            message: "Failed to search potential duplicates"
        });
    }
};

// Add block resident (create minimal resident and block)
export const addBlockResident = async (req, res) => {
    const { 
        name, 
        address, 
        reason, 
        selectedResidentId, 
        action 
    } = req.body;
    
    try {
        // Validate required fields
        if (!name || !name.first || !name.last || !reason) {
            return res.status(400).json({
                message: "First name, last name, and block reason are required"
            });
        }
        
        // If action is to block existing resident
        if (action === 'block_existing' && selectedResidentId) {
            const existingResident = await Resident.findById(selectedResidentId);
            
            if (!existingResident) {
                return res.status(404).json({
                    message: "Selected resident not found"
                });
            }
            
            // Check if already blocked
            if (existingResident.isBlocked) {
                return res.status(409).json({
                    message: "Resident is already blocked"
                });
            }
            
            // Create new block log entry
            const newBlockLog = await BlockLog.create({
                residentID: selectedResidentId,
                isBlocked: true,
                dateBlocked: new Date(),
                reason: reason
            });
            
            // Update resident with block status and link to block log
            const updatedResident = await Resident.findByIdAndUpdate(
                selectedResidentId, 
                { 
                    isBlocked: true,
                    blocked: newBlockLog._id  // Make sure to set the blocked reference
                }, 
                { new: true }
            );
            
            return res.status(200).json({
                message: "Existing resident blocked successfully",
                resident: updatedResident,
                blockLog: newBlockLog
            });
        }
        
        // Default action: create new resident and block
        // Check for duplicates one more time to prevent race conditions
        const duplicateCheck = {
            'name.first': new RegExp(`^${name.first}$`, 'i'),
            'name.last': new RegExp(`^${name.last}$`, 'i'),
            isDeleted: false
        };
        
        if (name.middle) {
            duplicateCheck['name.middle'] = new RegExp(`^${name.middle}$`, 'i');
        }
        
        if (name.suffix) {
            duplicateCheck['name.suffix'] = new RegExp(`^${name.suffix}$`, 'i');
        }
        
        const existingResident = await Resident.findOne(duplicateCheck);
        
        if (existingResident) {
            return res.status(409).json({
                message: "Resident already exists. Please use 'block existing' option.",
                existingResident: {
                    _id: existingResident._id,
                    name: existingResident.name,
                    address: existingResident.address,
                    isBlocked: existingResident.isBlocked
                }
            });
        }
        
        // Create minimal resident data
        let residentData = {
            name: {
                first: name.first,
                last: name.last,
                middle: name.middle || '',
                suffix: name.suffix || ''
            },
            citizenship: 'Filipino', // Default as per schema
            isBlocked: true // Will be blocked immediately
        };
        
        // Add optional address if provided
        if (address) {
            residentData.address = {
                streetName: address.streetName || '',
                apartment: address.apartment || '',
                householdNumber: address.householdNumber || '',
                sitio: address.sitio || ''
            };
        }
        
        // Create the resident
        const newResident = await Resident.create(residentData);
        
        // Create block log
        const newBlockLog = await BlockLog.create({
            residentID: newResident._id,
            isBlocked: true,
            dateBlocked: new Date(),
            reason: reason
        });
        
        // Update resident with block log reference - THIS IS CRUCIAL
        const updatedResident = await Resident.findByIdAndUpdate(
            newResident._id,
            { blocked: newBlockLog._id },
            { new: true }
        ).populate('blocked'); // Populate the blocked field
        
        return res.status(201).json({
            message: "Resident created and blocked successfully",
            resident: updatedResident,
            blockLog: newBlockLog
        });
        
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to add block resident",
            function: "addBlockResident"
        });
        return res.status(500).json({ 
            error: error.message,
            message: "Failed to add block resident"
        });
    }
};
