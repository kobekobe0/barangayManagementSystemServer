import Borrow from "../../models/Borrow.js";

export const getBorrows = async (req, res) => {
    const { page = 1, limit = 20, vehicle, first="", last="", middle="" } = req.query;
    try {
        let matchStage = {};

        if (vehicle) {
            matchStage.vehicle = { $regex: vehicle, $options: 'i' };
        }

        if (first || last || middle) {
            matchStage.$or = [];
            if (first) {
                matchStage.$or.push({ "residentID.name.first": { $regex: first, $options: 'i' } });
                matchStage.$or.push({ "nonResident.name.first": { $regex: first, $options: 'i' } });
            }
            if (middle) {
                matchStage.$or.push({ "residentID.name.middle": { $regex: middle, $options: 'i' } });
                matchStage.$or.push({ "nonResident.name.middle": { $regex: middle, $options: 'i' } });
            }
            if (last) {
                matchStage.$or.push({ "residentID.name.last": { $regex: last, $options: 'i' } });
                matchStage.$or.push({ "nonResident.name.last": { $regex: last, $options: 'i' } });
            }
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const borrows = await Borrow.aggregate([
            {
                $lookup: {
                    from: "residents",
                    localField: "residentID",
                    foreignField: "_id",
                    as: "residentID"
                }
            },
            {$unwind: {path: "$residentID", preserveNullAndEmptyArrays: true}},
            {$match: matchStage},
            {$sort: {dateBorrowed: -1}},
        ])
        .skip(skip)
        .limit(parseInt(limit));

        return res.status(200).json({
            borrows,
            message: "Borrows found",
        });

    } catch (error) {
        console.error('Error fetching borrows:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};