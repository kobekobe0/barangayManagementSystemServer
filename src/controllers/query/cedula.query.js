import formatCedula from "../../helper/formatDataCedula.js";
import generateForm from "../../helper/generateForm.js";
import Cedula from "../../models/Cedula.js";

export const getCedula = async (req, res) => {
    const cedulaID = req.params.id;
    try {
        const cedula = await Cedula.findById(cedulaID);
        if(!cedula) {
            return res.status(404).json({
                message: "Cedula not found"
            });
        }
        return res.status(200).json({
            message: "Cedula found",
            data: cedula
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to get cedula",
            function: "getCedula"
        });
        return res.status(409).json({
            error: error.message,
            message: "Failed to get cedula"
        });
    }
}


export const getCedulas = async (req, res) => {
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

        const options = {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
            select: 'bookletNumber startOfCTC endOfCTC preparedBy dateFrom dateTo', // Only select these fields
        };

        // Find receipts with pagination
        const cedula = await Cedula.paginate(query, options);
        
        return res.status(200).json({
            message: "Receipts found",
            data: cedula.docs,
            totalPages: cedula.totalPages,
            currentPage: cedula.page,
            totalReceipts: cedula.totalDocs,
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to get cedulas",
            function: "getCedulas"
        });
        return res.status(409).json({
            error: error.message,
            message: "Failed to get cedulas"
        });
    }
}


export const printCedula = async (req, res) => {
    const {id} = req.params;

    try {
        const cedula = await Cedula.findById(id);
        if(!cedula) {
            return res.status(404).json({
                message: "Cedula not found"
            });
        }

        await formatCedula(cedula).then(async (data) => {
            console.log('Data to render:', data);
            const docxFile = await generateForm(data, 'cedula');
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            res.setHeader('Content-Disposition', `attachment; filename=${cedula.bookletNumber}.docx`);
            return res.send(docxFile);
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to get cedula",
            function: "getCedula"
        });
        return res.status(409).json({
            error: error.message,
            message: "Failed to get cedula"
        });
    }
}