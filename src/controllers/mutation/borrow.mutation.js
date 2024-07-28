import Borrow from "../../models/Borrow.js";

// body = isResident, residentID, nonResident, reason, dateBorrowed, placeWent, vehicle

export const recordBorrow = async (req, res) => {
    try {
        const newBorrow = new Borrow(req.body);
        await newBorrow.save();
        return res.status(201).json({
            message: "Borrow recorded successfully",
            borrow: newBorrow
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to record borrow",
            function: "recordBorrow"
        })
        return res.status(409).json({ 
            error: error.message,
            message: "Failed to record borrow"
        });
    }
}

export const deleteBorrow = async (req, res) => {
    const { id } = req.params;
    try {
        const borrow = await Borrow.findById(id);
        if (!borrow) {
            return res.status(404).json({
                message: "Borrow not found",
            });
        }
        await Borrow.findByIdAndDelete(id);
        return res.status(201).json({
            message: "Borrow deleted successfully",
            borrow: borrow
        });
    } catch (error) {   
        console.log({
            error: error.message,
            message: "Failed to delete borrow",
            function: "deleteBorrow"
        })
        return res.status(409).json({ 
            error: error.message,
            message: "Failed to delete borrow"
        });
    }
}