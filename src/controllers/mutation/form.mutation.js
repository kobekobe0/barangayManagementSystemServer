import Form from '../../models/Form.js';
import Business from '../../models/Business.js';
import Resident from '../../models/Resident.js'

import formDataToRender from '../../helper/formDataToRender.js';
import generateForm from '../../helper/generateForm.js';
import getExpirationDate from '../../helper/getExpirationDate.js';

function updateField(form, fieldName) {
    if (form[fieldName]) {
        form[fieldName] = typeof form[fieldName] === 'string' ? JSON.parse(form[fieldName]) : form[fieldName];
    }
}

export const createForm = async (req, res) => {
    const form = req.body;
    console.log(form)
    try{
        const formCount = await Form.countDocuments({ formType: form.formType });
        const paddedFormCount = String(formCount + 1).padStart(6, '0');
        let picturePath = null;
        
        if(form?.nonResident){
            updateField(form, 'nonResident');
            updateField(form, 'electrical');
            updateField(form, 'excavation');
            updateField(form, 'business');
            updateField(form, 'fencing');
            updateField(form, 'building');
        }
        console.log("UPDATED: ", form)
        //check if there is  file uploaded
        if(req.filename){
            console.log('Picture uploaded');
            picturePath = `images/${req.filename}`;
        }

        const expirationDate = getExpirationDate(form.formType);

        let formattedExpirationDate = null;

        if(expirationDate){
            formattedExpirationDate = `${expirationDate.getMonth() + 1}-${expirationDate.getDate()}-${expirationDate.getFullYear()}`;
        }

        //update yrs of residency if business is not present

        if(!form?.business){
            if(form?.residentID){
                if(form?.yrsOfResidency){
                    await Resident.findByIdAndUpdate(form.residentID, { $set: { yrsOfResidency: form.yrsOfResidency } });
                    console.log('Yrs of residency updated');
                }
            }
            
        }

        const newForm = await Form.create({
            ...form,
            formNumber: `${form.formType}-${paddedFormCount}`,
            expirationDate: formattedExpirationDate,
            image: picturePath,
        });

        const populatedForm = await Form.findById(newForm._id)
            .populate('residentID', 'name address picture dateOfBirth placeOfBirth yrsOfResidency')
            .populate('business')


        const dataToRender = await formDataToRender(populatedForm).then(async (data) => {
            console.log('Data to render:', data);
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

export const rePrintForm = async (req, res) => {
    const {id} = req.params;
    try{
        const populatedForm = await Form.findById(id)
            .populate('residentID', 'name address picture dateOfBirth placeOfBirth yrsOfResidency')
            .populate('business')
        const dataToRender = await formDataToRender(populatedForm).then(async (data) => {
            console.log('Data to render:', data);
            const docxFile = await generateForm(data, populatedForm.formType);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            res.setHeader('Content-Disposition', `attachment; filename=${populatedForm.formType}-${populatedForm.formNumber}.docx`);
            return res.send(docxFile);
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to reprint form",
            function: "rePrintForm"
        })
        return res.status(409).json({ 
            error: error.message,
            message: "Failed to reprint form"
        });
    }
}