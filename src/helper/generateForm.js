import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import ImageModule from 'docxtemplater-image-module-free';
import TEMPLATE_PATHS from '../constants/templates.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

//sample template path to be passed
//const content = await fs.promises.readFile(path.resolve(__dirname, "../../templates/businessClearance.docx"));

//create an object, key is the formType and value is the template path

//sample img path to be passed
//{image: path.resolve(__dirname, "../../images/668d6557d0b462e857a1ec47_pfp.png")}

const generateForm = async (data, formType) => {
    try {
        console.log('Starting form generation...');

        let dataToRender = { ...data };

        if (data?.image) {
            dataToRender.image = path.resolve(__dirname, './src', data?.image);
            console.log('Image path resolved:', dataToRender.image);
        }

        const templatePath = TEMPLATE_PATHS[formType];
        if (!templatePath) {
            throw new Error(`Template path for form type ${formType} not found`);
        }

        console.log('Reading template file from path:', path.resolve(__dirname, templatePath));
        const content = await fs.promises.readFile(path.resolve(__dirname, templatePath));
        console.log('Template file read successfully.');

        let opts = {
            centered: true,
            fileType: "docx",
            getImage: function (tagValue, tagName) {
                try {
                    console.log(`Reading image from path: ${tagValue}`);
                    return fs.readFileSync(tagValue);
                } catch (error) {
                    console.error('Error reading image:', error);
                    return null;
                }
            },
            getSize: function (img, tagValue, tagName) {
                return [150, 150];
            }
        };

        const imageModule = new ImageModule(opts);

        const zip = new PizZip(content);
        console.log('Creating Docxtemplater instance.');
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
            modules: [imageModule],
        });

        console.log('Rendering document with data:', dataToRender);
        doc.render(dataToRender);
        console.log('Document rendered successfully.');

        const buf = doc.getZip().generate({
            type: "nodebuffer",
            compression: "DEFLATE",
        });
        console.log('Document buffer generated.');

        const outputPath = path.resolve(__dirname, `../docx/temp.docx`);
        console.log('Writing document to path:', outputPath);
        await fs.promises.writeFile(outputPath, buf);
        console.log('Document written successfully.');

        console.log('Reading the document file to return.');
        return fs.promises.readFile(outputPath);
    } catch (err) {
        console.error('Error generating form:', err);
        throw err;
    }
};

export default generateForm;