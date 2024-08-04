const getExpirationDate = (formType) => {
    let expirationDate = new Date();

    const noExpiry = ['IC', 'CB', 'SWD'];
    const sixMonths = ['BC', 'BRC', 'BDC', 'ECC', 'FC', 'RC', 'PAO', 'UEC', 'WP', 'EC', 'EX']
    const oneYear = ['SLP', 'TODA', 'LBC', 'ITR', 'FT']
    const threeMonts = ['CH', 'NRC', 'CL']

    if(noExpiry.includes(formType)){
        expirationDate = null;
    } else if(threeMonts.includes(formType)){
        expirationDate.setMonth(expirationDate.getMonth() + 3);
    } else if(sixMonths.includes(formType)){
        expirationDate.setMonth(expirationDate.getMonth() + 6);
    } else if(oneYear.includes(formType)){
        expirationDate.setFullYear(expirationDate.getFullYear() + 1);
    } else if(formType === 'BSC'){ 
        expirationDate = new Date(expirationDate.getFullYear(), 11, 31);
    } else {
        throw new Error(`Expiration date for form type ${formType} not found`);
    }

    return expirationDate;
}

export default getExpirationDate;