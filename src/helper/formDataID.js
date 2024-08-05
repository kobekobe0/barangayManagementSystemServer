const formatID = async (resident) => {
    let data = {}
    //loop through the receipt.items
    //and populate the data object
    //for example receipt.items[0].name == data.name1 and receipt.items[0].price == data.price1
    //and so on

    //format date like this mm-dd-yy
    
    data.image = `../../${resident.picture}`
    
    //yyyymmhhss
    const fourDigitYear = new Date().getFullYear()
    const twoDigitMonth = new Date().getMonth() > 9 ? new Date().getMonth() : `0${new Date().getMonth()}`
    const twoDigitHour = new Date().getHours() > 9 ? new Date().getHours() : `0${new Date().getHours()}`
    const twoDigiMinute = new Date().getMinutes() > 9 ? new Date().getMinutes() : `0${new Date().getMinutes()}`
    data.number = `${fourDigitYear}${twoDigitMonth}${twoDigitHour}${twoDigiMinute}`
    data.name = `${resident?.name?.first || ''} ${resident?.name?.middle ? resident.name.middle[0].toUpperCase() : ''} ${resident?.name?.last || ''} ${resident?.name?.suffix || ''}`
    let dateOfBirth = new Date(resident?.dateOfBirth);
    let formattedDate = dateOfBirth.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    });

    data.dateOfBirth = formattedDate
 
    data.sss = resident?.IDs?.SSS || ''
    data.tin = resident?.IDs?.TIN || ''
    data.pagibig = resident?.IDs?.PAGIBIG || ''
    data.philhealth = resident?.IDs?.PhilHealth || ''
    data.precinct = resident?.voterInfo?.precinctNumber || ''
    data.voter = resident?.voterInfo?.voterID || ''
    data.blood = resident?.bloodType || ''

    data.address = `${resident?.address?.streetName ? resident?.address?.streetName + ' ' : ''}${resident?.address?.apartment ? resident?.address?.apartment + ' ' : ''}${resident?.address?.householdNumber ? resident?.address?.householdNumber + ' ' : ''}${resident?.address?.sitio ? resident.address.sitio + ' ' : ''}`
    
    data.emergencyName = resident?.emergencyContact?.name || ''
    data.emergencyContact = resident?.emergencyContact?.mobileNumber || ''
    data.emergencyAddress = resident?.emergencyContact?.address || ''

    //expiration is one year from now
    data.expirationDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
    });

    console.log('Data:', data)

    return data
}

export default formatID;