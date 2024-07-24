import Resident from "../../models/Resident.js";

export const getResident = async (req, res) => {
    const { id } = req.params;
    try {
        const resident = await Resident.findById(id, {isDeleted: false}).populate("blocked");
        if (resident) {
            const residentWithPicture = {
                ...resident._doc,
                ...(resident.picture && { picture: `${process.env.SERVER_URL}/images/${resident.picture}` })
            };
            return res.status(200).json({
                data: residentWithPicture,
            });
        } else {
            return res.status(404).json({
                error: 'Resident not found',
                message: "No resident found with the provided ID"
            });
        }
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to get resident",
            function: "getResident"
        })
        return res.status(409).json({ 
            error: error.message,
            message: "Failed to get resident"
        });
    }
}

export const getResidents = async (req, res) => {
    try {
        const { searchFirst = "", searchMiddle = "", searchLast = "", limit = 100, page = 1, isBlocked = false } = req.query;
        console.log(req.query)
        const query = {
            $and: [
                { 'name.first': { $regex: searchFirst, $options: 'i' } },
                { 'name.middle': { $regex: searchMiddle, $options: 'i' } },
                { 'name.last': { $regex: searchLast, $options: 'i' } }
            ]
        };

        const isBlockedFilter = isBlocked === 'true';

        const aggregatePipeline = [
            { $match: query },
            {
                $lookup: {
                    from: 'blockedlogs',
                    localField: 'blocked',
                    foreignField: '_id',
                    as: 'blockedDetails'
                }
            },
            {
                $unwind: {
                    path: '$blockedDetails',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $match: isBlockedFilter ? { 'blockedDetails.isBlocked': true } : {}
            },
            { $skip: (parseInt(page) - 1) * parseInt(limit) },
            { $limit: parseInt(limit) },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    dateOfBirth: 1,
                    address: 1,
                    isBlocked: '$blockedDetails.isBlocked',
                    picture: 1
                }
            }
        ];

        let residents = await Resident.aggregate(aggregatePipeline);
        const totalResidents = await Resident.countDocuments(query);

        residents = residents.map(resident => ({
            ...resident,
            picture: resident.picture ? `${process.env.SERVER_URL}/images/${resident.picture}` : resident.picture
        }));

        return res.status(200).json({
            data: residents,
            totalPages: Math.ceil(totalResidents / limit),
            currentPage: parseInt(page),
            totalResidents,
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to get residents",
            function: "getResidents"
        });
        return res.status(409).json({ 
            error: error.message,
            message: "Failed to get residents"
        });
    }
};

