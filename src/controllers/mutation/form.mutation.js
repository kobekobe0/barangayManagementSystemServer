import Form from '../../models/Form.js';
import Business from '../../models/Business.js';

import formDataToRender from '../../helper/formDataToRender.js';
import generateForm from '../../helper/generateForm.js';
import getExpirationDate from '../../helper/getExpirationDate.js';

//TODO: in yrsOfResidency, change it to date //only the year and month
//afected: createForm, getResident

export const createForm = async (req, res) => {
    const form = req.body;
    try{
        const formCount = await Form.countDocuments({ formType: form.formType });
        const paddedFormCount = String(formCount + 1).padStart(6, '0');

        const expirationDate = getExpirationDate(form.formType);

        const formattedExpirationDate = `${expirationDate.getMonth() + 1}-${expirationDate.getDate()}-${expirationDate.getFullYear()}`;
        
        const newForm = await Form.create({
            ...form,
            formNumber: `${form.formType}-${paddedFormCount}`,
            expirationDate: formattedExpirationDate
        });

        const populatedForm = await Form.findById(newForm._id)
            .populate('residentID', 'name address picture dateOfBirth placeOfBirth yrsOfResidency')
            .populate('business')


        const dataToRender = await formDataToRender(populatedForm).then(async (data) => {
            const docxFile = await generateForm(data, form.formType);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            res.setHeader('Content-Disposition', `attachment; filename=${form.formType}-${paddedFormCount}.docx`);
            if(newForm?.business){
                await Business.findByIdAndUpdate(newForm.business, { $set: { isNew: false } });
            }    
            return res.send(docxFile);
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to create form",
            function: "createForm"
        })
        return res.status(409).json({ 
            error: error.message,
            message: "Failed to create form"
        });
    }
}