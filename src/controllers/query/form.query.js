import Form from "../../models/Form.js";

export const getForm = async (req, res) => {
    const { id } = req.query;
    try {
        const form = await Form
            .findById(id)
            .populate('resident')
        return res.status(200).json({
            data: form,
        });
    }
    catch (error) {
        console.log({
            error: error.message,
            message: "Failed to get form",
            function: "getForm"
        })
        return res.status(409).json({
            error: error.message,
            message: "Failed to get form"
        });
    }
}

export const getForms = async (req, res) => {
    try {
        let { formNumber, formType, fromDate, toDate, first = "", last = "", middle = "", page = 1, limit = 50 } = req.query;

        // Prepare the base query
        const matchStage = {};

        // Filter by form type if provided, not exact match
        if (formType) {
            matchStage.formType = { $regex: formType, $options: 'i' };
        }

        // Filter by form number if provided
        if (formNumber) {
            matchStage.formNumber = formNumber;
        }

        // Filter by date range if both fromDate and toDate are provided
        if (fromDate && toDate) {
            matchStage.formDateIssued = {
                $gte: new Date(fromDate), // fromDate should be less than or equal to dateIssued
                $lte: new Date(toDate)    // toDate should be greater than or equal to dateIssued
            };
        }

        // Search by name if first, last, or middle is provided
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

        // Pagination setup
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const totalForms = await Form.countDocuments(matchStage);
        const totalPages = Math.ceil(totalForms / limit);

        // Execute the query
        const forms = await Form.aggregate([
            {
                $lookup: {
                    from: "residents",
                    localField: "residentID",
                    foreignField: "_id",
                    as: "residentID"
                }
            },
            { $unwind: { path: "$residentID", preserveNullAndEmptyArrays: true } },
            { $match: matchStage },
            { $sort: { formDateIssued: -1 } }, // Sort by dateIssued in descending order
        ])
        .skip(skip)
        .limit(parseInt(limit));

        return res.status(200).json({
            data: forms,
            totalPages,
            currentPage: parseInt(page),
            totalForms
        });
    } catch (error) {
        console.error("Failed to get forms:", error);
        return res.status(500).json({ error: "Failed to get forms" });
    }
};

export const getResidentForms = async (req, res) => {
    try {
        const residentID = req.params.id;
        const { formType, page = 1, limit = 100 } = req.query;

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
            .sort({ formDateIssued: -1 }) // Sort by dateIssued in descending order
            .populate('residentID'); // Populate the resident details if needed

        return res.status(200).json({
            data: forms,
            totalPages,
            currentPage: parseInt(page),
            totalForms
        });
    } catch (error) {
        console.error("Failed to get resident forms:", error);
        return res.status(500).json({ error: "Failed to get resident forms" });
    }
};