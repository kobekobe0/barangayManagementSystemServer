import Borrow from "../../models/Borrow.js";

export const getBorrows = async (req, res) => {
    const { page = 1, limit = 20, vehicle } = req.query;

    try {
        // Build query
        let query = {};
        if (vehicle) {
            query.vehicle = vehicle;
        }

        // Pagination options
        const options = {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            sort: { dateBorrowed: -1 } // Sort by dateBorrowed in descending order
        };

        // Get paginated results
        const result = await Borrow.paginate(query, options);

        // Get total number of borrows
        const totalBorrows = await Borrow.countDocuments(query);

        // Aggregate by vehicle
        const aggregateResult = await Borrow.aggregate([
            { $group: { _id: "$vehicle", count: { $sum: 1 } } }
        ]);

        // Show number per vehicle
        const vehicleCounts = aggregateResult.reduce((acc, curr) => {
            acc[curr._id] = curr.count;
            return acc;
        }, {});

        res.status(200).json({
            totalBorrows,
            vehicleCounts,
            borrows: result.docs,
            totalPages: result.totalPages,
            currentPage: result.page
        });
    } catch (error) {
        console.error('Error fetching borrows:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const getNumbers = async (req, res) => {
    
}