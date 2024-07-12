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

        res.status(201).json({
            message: "Receipt created",
            data: newReceipt
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to create receipt",
            function: "createReceipt"
        });
        res.status(409).json({
            error: error.message,
            message: "Failed to create receipt"
        });
    }
}