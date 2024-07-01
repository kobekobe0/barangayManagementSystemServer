import Resident from "../../models/Resident.js";

export const getResident = async (req, res) => {
    const { id } = req.query;
    try {
        const resident = await Resident.findById(id).populate("blocked");
        res.status(200).json({
            data: resident,
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to get resident",
            function: "getResident"
        })
        res.status(409).json({ 
            error: error.message,
            message: "Failed to get resident"
        });
    }
}

export const getResidents = async (req, res) => {
    try {
        const { search, limit = 100, page = 1, isBlocked = false } = req.query;

        const query = search
            ? {
                $or: [
                    { combinedName: { $regex: search, $options: 'i' } }
                ]
            }
            : {};

        const isBlockedFilter = isBlocked === 'true';

        const aggregatePipeline = [
            {
                $addFields: {
                    combinedName: {
                        $concat: [
                            { $ifNull: ["$name.last", ""] }, " ",
                            { $ifNull: ["$name.first", ""] }, " ",
                            { $ifNull: ["$name.middle", ""] }
                        ]
                    }
                }
            },
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
                    combinedName: 1,
                    isBlocked: '$blockedDetails.isBlocked'
                }
            }
        ];

        const residents = await Resident.aggregate(aggregatePipeline);
        const totalResidents = await Resident.countDocuments(query);

        res.status(200).json({
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
        res.status(409).json({ 
            error: error.message,
            message: "Failed to get residents"
        });
    }
};

