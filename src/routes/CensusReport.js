import express from 'express'
import { updateCensusReport } from '../controllers/mutation/censusReport.mutation.js'
import CensusReport from '../models/CensusReport.js'

const censusReportRouter = express.Router()

censusReportRouter.post('/', updateCensusReport)

censusReportRouter.get('/', async (req, res) => {
    const censusReport = await CensusReport.findOne()
    if (!censusReport) {
        //create a new census report
        const newCensusReport = await CensusReport.create({
            totalResidents: 0,
        })
        return res.status(200).json({
            message: "Census report created",
            data: newCensusReport
        })
    }
    return res.status(200).json({
        message: "Census report found",
        data: censusReport
    })
})

export default censusReportRouter