import Receipt from "../../models/Receipt.js";

export const createReceipt = async (req, res) => {
    const { bookletNumber, startOfOR, preparedBy } = req.body;
    try {
        let items = [];
        const endOfOR = (parseInt(startOfOR, 10) + 49).toString().padStart(startOfOR.length, '0');

        for (let i = parseInt(startOfOR, 10); i <= parseInt(endOfOR, 10); i++) {
            let ORNumber = i.toString().padStart(startOfOR.length, '0');
            items.push({ ORNumber });
        }

        const newReceipt = await Receipt.create({
            bookletNumber,
            startOfOR,
            endOfOR,
            preparedBy,
            items
        });

        return res.status(201).json({
            message: "Receipt created",
            data: newReceipt
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to create receipt",
            function: "createReceipt"
        });
        return res.status(409).json({
            error: error.message,
            message: "Failed to create receipt"
        });
    }
}

export const saveReceiptItems = async (req, res) => {
    const { items } = req.body;
    const { id } = req.params;

    try {
        //NOTE: transaform date string to date object in frontend
        const updatedReceipt = await Receipt.findByIdAndUpdate(id, { items }, {new: true});

        return res.status(201).json({
            message: "Receipt items updated",
            data: updatedReceipt
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to update receipt items",
            function: "saveReceiptItems"
        });
        return res.status(409).json({
            error: error.message,
            message: "Failed to update receipt items"
        });
    }
}

export const deleteReceipt = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedReceipt = await Receipt.findByIdAndDelete(id);
        return res.status(201).json({
            message: "Receipt deleted",
            data: deletedReceipt
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to delete receipt",
            function: "deleteReceipt"
        });
        return res.status(409).json({
            error: error.message,
            message: "Failed to delete receipt"
        });
    }
}