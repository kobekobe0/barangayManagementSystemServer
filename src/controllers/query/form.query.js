import Form from "../../models/Form";

export const getForm = async (req, res) => {
    const { id } = req.query;
    try {
        const form = await Form
            .findById(id)
            .populate('resident')
        res.status(200).json({
            data: form,
        });
    }
    catch (error) {
        console.log({
            error: error.message,
            message: "Failed to get form",
            function: "getForm"
        })
        res.status(409).json({
            error: error.message,
            message: "Failed to get form"
        });
    }
}

export const getForms = async (req, res) => {
    try {
        let { formType, fromDate, toDate, searchKey, page = 1, limit = 10 } = req.query;

        // Prepare the base query
        const query = {};

        // Filter by form type if provided
        if (formType) {
            query.formType = formType;
        }

        // Filter by date range if both fromDate and toDate are provided
        if (fromDate && toDate) {
            query.dateIssued = {
                $gte: new Date(fromDate), // fromDate should be less than or equal to dateIssued
                $lte: new Date(toDate)    // toDate should be greater than or equal to dateIssued
            };
        }

        // Search by formNumber if searchKey is provided
        if (searchKey) {
            query.formNumber = { $regex: searchKey, $options: 'i' }; // Case-insensitive search
        }

        // Pagination setup
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const totalForms = await Form.countDocuments(query);
        const totalPages = Math.ceil(totalForms / limit);

        // Execute the query
        const forms = await Form.find(query)
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ dateIssued: -1 }) // Sort by dateIssued in descending order
            .populate('residentID'); // Populate the resident details if needed

        res.status(200).json({
            data: forms,
            totalPages,
            currentPage: parseInt(page),
            totalForms
        });
    } catch (error) {
        console.error("Failed to get forms:", error);
        res.status(500).json({ error: "Failed to get forms" });
    }
};

export const getResidentForms = async (req, res) => {
    try {
        const { residentID, formType, page = 1, limit = 10 } = req.query;

        // Prepare the base query
        const query = { residentID };

        // Filter by form type if provided
        if (formType) {
            query.formType = formType;
        }

        // Pagination setup
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const totalForms = await Form.countDocuments(query);
        const totalPages = Math.ceil(totalForms / limit);

        // Execute the query
        const forms = await Form.find(query)
            .skip(skip)
            .limit(parseInt(limit))
            .sort({ dateIssued: -1 }) // Sort by dateIssued in descending order
            .populate('residentID'); // Populate the resident details if needed

        res.status(200).json({
            data: forms,
            totalPages,
            currentPage: parseInt(page),
            totalForms
        });
    } catch (error) {
        console.error("Failed to get resident forms:", error);
        res.status(500).json({ error: "Failed to get resident forms" });
    }
};