import IndigentHolder from '../../models/IndigentHolder.js'
import Indigent from '../../models/Indigent.js'
import Resident from '../../models/Resident.js'

export const createIndigentHolder = async (req, res) => {
    const {amount} = req.body
    try{
        const indigentHolder = await IndigentHolder.create({amount})
        return res.status(201).json({
            message: 'Indigent Holder created successfully',
            data: indigentHolder
        })
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to create Indigent Holder",
            function: "createIndigentHolder"
        })
        return res.status(409).json({
            error: error.message,
            message: "Failed to create Indigent Holder"
        })
    }
}

export const createIndigent = async (req, res) => {
    try {
        console.log('eerr')
        const patient = await Resident.findById(req.body.patient)
        console.log('eerr')
        if(patient.isBlocked){
            return res.status(409).json({
                message: 'Resident is blocked'
            })
        }
        console.log('eerr')
        const indigentHolder = await IndigentHolder.findById(req.body.holderID)
        console.log('eerr')
        if (indigentHolder.amount < req.body.amount) {
            return res.status(409).json({
                message: 'Insufficient funds'
            })
        }
        console.log('eerr')
        // Deduct amount from holder
        indigentHolder.amount -= req.body.amount;
        console.log('eerr')
        await indigentHolder.save()
        console.log('eerr')

        if(indigentHolder.amount === 0){
            indigentHolder.exhaustedAt = new Date()
            await indigentHolder.save()
        }
        console.log('eerr')
        const indigent = await Indigent.create(req.body)
        console.log('eerr')
        return res.status(201).json({
            message: 'Indigent created successfully',
            data: indigent
        })
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to create Indigent",
            function: "createIndigent"
        })
        return res.status(409).json({
            error: error.message,
            message: "Failed to create Indigent"
        })
    }
}

export const editIndigentHolder = async (req, res) => {
    const {id} = req.params
    try {
        const indigentHolder = await IndigentHolder.findByIdAndUpdate(id, {
            amount: req.body.amount,
        }, {new: true})
        return res.status(201).json({
            message: 'Indigent Holder updated successfully',
            data: indigentHolder
        })
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to update Indigent Holder",
            function: "editIndigentHolder"
        })
        return res.status(409).json({
            error: error.message,
            message: "Failed to update Indigent Holder"
        })
    }
}

export const editIndigent = async (req, res) => {
    const {id} = req.params
    try {

        const newAmount = req.body.amount - req.body.oldAmount

        const indigentHolder = await IndigentHolder.findById(req.body.holderID)

        if (indigentHolder.amount < newAmount) {
            return res.status(409).json({
                message: 'Insufficient funds'
            })
        }

        indigentHolder.amount -= newAmount;
        await indigentHolder.save()

        const indigent = await Indigent.findByIdAndUpdate(id, {
            patient: req.body.patient,
            receivedBy: req.body.receivedBy,
            problem: req.body.problem,
            recommendation: req.body.recommendation,
            amount: req.body.amount,
            approvedAt: req.body.approvedAt,
            holderID: req.body.holderID,
        }, {new: true})

        return res.status(201).json({
            message: 'Indigent updated successfully',
            data: indigent
        })
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to update Indigent",
            function: "editIndigent"
        })
        return res.status(409).json({
            error: error.message,
            message: "Failed to update Indigent"
        })
    }
}





