import formatReceipt from "../../helper/formatDataReceipt.js";
import generateForm from "../../helper/generateForm.js";
import Receipt from "../../models/Receipt.js";

export const getReceipt = async (req, res) => {
    const receiptID = req.params.id;
    try {
        const receipt = await Receipt.findById(receiptID);
        if(!receipt) {
            return res.status(404).json({
                message: "Receipt not found"
            });
        }
        return res.status(200).json({
            message: "Receipt found",
            data: receipt
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to get receipt",
            function: "getReceipt"
        });
        return res.status(409).json({
            error: error.message,
            message: "Failed to get receipt"
        });
    }
}


export const getReceipts = async (req, res) => {
    const { page = 1, limit = 10, bookletNumber = '', preparedBy = '' } = req.query;

    try {
        // Build the query object
        let query = {};

        if (bookletNumber) {
            query.bookletNumber = { $regex: bookletNumber, $options: 'i' };
        }

        if (preparedBy) {
            query.preparedBy = { $regex: preparedBy, $options: 'i' }; // Partial match, case-insensitive
        }

        console.log("QUERY: ", query)

        // Pagination options
        const options = {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            select: 'bookletNumber startOfOR endOfOR preparedBy dateCreated', // Only select these fields
        };

        // Find receipts with pagination
        const receipts = await Receipt.paginate(query, options);
        
        return res.status(200).json({
            message: "Receipts found",
            data: receipts.docs,
            totalPages: receipts.totalPages,
            currentPage: receipts.page,
            totalReceipts: receipts.totalDocs,
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to get receipts",
            function: "getReceipts"
        });
        return res.status(409).json({
            error: error.message,
            message: "Failed to get receipts"
        });
    }
}


export const printReceipt = async (req, res) => {
    const {id} = req.params;

    try {
        const receipt = await Receipt.findById(id);
        if(!receipt) {
            return res.status(404).json({
                message: "Receipt not found"
            });
        }
        await formatReceipt(receipt).then(async (data) => {
            console.log('Data to render:', data);
            const docxFile = await generateForm(data, 'receipt');
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            res.setHeader('Content-Disposition', `attachment; filename=${receipt.bookletNumber}.docx`);
            return res.send(docxFile);
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to print receipt",
            function: "printReceipt"
        });
        return res.status(409).json({
            error: error.message,
            message: "Failed to print receipt"
        });
    }
}