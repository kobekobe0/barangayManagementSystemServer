import Form from '../../models/Form.js';

export const createForm = async (req, res) => {
    const form = req.body;
    try{
        //count number of forms depending on the form type
        const formCount = await Form.countDocuments({ formType: form.formType });
        const paddedFormCount = String(formCount + 1).padStart(6, '0');

        const expirationDate = new Date();

        if(form.formType === 'BC'){
            //add 6 months to the current date
            expirationDate.setMonth(expirationDate.getMonth() + 6);
        } else {
            //dec 31 of the current year
            expirationDate.setMonth(11);
            expirationDate.setDate(31);
        }

        //form the date mm-dd-yyyy
        const formattedExpirationDate = `${expirationDate.getMonth() + 1}-${expirationDate.getDate()}-${expirationDate.getFullYear()}`;
        
        const newForm = await Form.create(
            {
                ...form,
                formNumber: `${form.formType}-${paddedFormCount}`,
                expirationDate: formattedExpirationDate
            }
        );
        res.status(201).json({
            message: "Form created successfully",
            form: newForm
        });
    } catch (error) {
        console.log({
            error: error.message,
            message: "Failed to create form",
            function: "createForm"
        })
        res.status(409).json({ 
            error: error.message,
            message: "Failed to create form"
        });
    }
}