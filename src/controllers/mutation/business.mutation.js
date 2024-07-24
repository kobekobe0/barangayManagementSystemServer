import Business from '../../models/Business.js'
import Form from '../../models/Form.js'

export const createBusiness = async (req, res) => {
    try {
        const business = await Business.create(req.body)

        if(!business) {
            return res.status(400).json({
                message: 'Business not created',
                data: business,
            })
        }

        return res.status(201).json({
            message: 'Business created successfully',
            data: business,
        })
    } catch (error) {
        console.log({
            message: error.message,
            function: 'createBusiness',
        })

        return res.status(500).json({
            message: error.message,
            function: 'createBusiness',
        })
    }
}


export const generateBusinessForm = async (req, res) => { //TODO: handle also here other transactions regarding business
    const {  residentID, businessID, isNew, purpose = "", CTCNo, ORNo } = req.body
    // create form
    try{
        const form = await Form.create({
            residentID,
            formType: 'BUSINESS',
            formName: 'BSC',
            business: businessID,
            purpose,
            placeIssued: 'Barangay Hall', // TODO: Create collection in db for settings
            CTCNo,
            ORNo,
        })
    
        if(!form) {
            return res.status(400).json({
                message: 'Form not created',
                data: form,
            })
        }
    
        //update business isNew and expiry date and push the form ID
        const updatedBusiness = await Business.findByIdAndUpdate(businessID, {
            isNew, //NOTE: If false for renewal
            isExpired: false,
            $push: { formIDs: form._id }
        }, { new: true })
    
        if(!updatedBusiness) {
            return res.status(400).json({
                message: 'Business not updated',
                data: updatedBusiness,
            })
        }
    
        return res.status(201).json({
            message: 'Form created successfully',
            data: form,
        })
    } catch (error) {
        console.log({
            message: error.message,
            function: 'generateBusinessForm',
        })
        return res.status(500).json({
            message: error.message,
            function: 'generateBusinessForm',
        }) // TODO: make res error into a function
    }
}

export const updateBusiness = async (req, res) => {
    try {
        const { id } = req.params
        // eto lang mga ipasa from frontend const { businessName, location, natureOfBusiness, plateNumber, cellphoneNumber, expiryDate, isNew, isClosed, dateClosed } = req.body
        //update business except for its formIDs
        const updatedBusiness = await Business.findByIdAndUpdate(id, req.body, { new: true })

        if(!updatedBusiness) {
            return res.status(400).json({
                message: 'Business not updated',
                data: updatedBusiness,
            })
        }

        return res.status(201).json({
            message: 'Business updated successfully',
            data: updatedBusiness,
        })

    } catch (error) {
        console.log({
            message: error.message,
            function: 'updateBusiness',
        })

        return res.status(500).json({
            message: error.message,
            function: 'updateBusiness',
        })
    }
}

export const deleteBusiness = async (req, res) => {
    try {
        const { id } = req.params
        const deletedBusiness = await Business.findByIdAndUpdate(id, { isDeleted: true }, { new: true })

        if(!deletedBusiness) {
            return res.status(400).json({
                message: 'Business not deleted',
                data: deletedBusiness,
            })
        }

        return res.status(201).json({
            message: 'Business deleted successfully',
            data: deletedBusiness,
        })

    } catch (error) {
        console.log({
            message: error.message,
            function: 'deleteBusiness',
        })

        return res.status(500).json({
            message: error.message,
            function: 'deleteBusiness',
        })
    }
}
