import Cedula from "../../models/Cedula.js";

export const createCedula = async (req, res) => {
    const { bookletNumber, startOfCTC, preparedBy, dateFrom, dateTo } = req.body;
    try {
        const endOfCTC = (parseInt(startOfCTC, 10) + 49).toString().padStart(startOfCTC.length, '0');
        let items=[];
        for (let i = parseInt(startOfCTC, 10); i <= parseInt(endOfCTC, 10); i++) {
            let CTCNumber = i.toString().padStart(startOfCTC.length, '0');
            items.push({ CTCNumber });
        }

        const newCedula = await Cedula.create({
            bookletNumber,
            startOfCTC,
            endOfCTC,
            preparedBy,
            items,
            dateFrom,
            dateTo
        });

        return res.status(201).json({
            message: "Cedula created",
            data: newCedula
        });


    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to create cedula",
            function: "createCedula"
        })
        res.status(400).json({ message: error.message });
    }
}


export const saveCedulaItems = async (req, res) => {
    const { items } = req.body;
    const { id } = req.params;

    try {
        const updatedCedula = await Cedula.findByIdAndUpdate(id, { items }, {new: true});

        return res.status(201).json({
            message: "Cedula items updated",
            data: updatedCedula
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to update cedula items",
            function: "saveCedulaItems"
        });
        return res.status(409).json({
            error: error.message,
            message: "Failed to update cedula items"
        });
    }
}


export const deleteCedula = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCedula = await Cedula.findByIdAndDelete(id);
        return res.status(201).json({
            message: "Cedula deleted",
            data: deletedCedula
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to delete cedula",
            function: "deleteCedula"
        });
        return res.status(409).json({
            error: error.message,
            message: "Failed to delete cedula"
        });
    }
}