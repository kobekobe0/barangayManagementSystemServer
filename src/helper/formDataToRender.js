const formDataToRender = async (populatedForm) => {    
    //address = residet/nonResident address
    //location = entity address (e.g. business address)
    let dataToRender = {
        //default values in a form
        dateIssued: populatedForm?.dateIssued ? new Date(populatedForm.dateIssued).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '',
        placeIssued: populatedForm.placeIssued.toUpperCase(),
        CTCNo: populatedForm.CTCNo || '',
        ORNo: populatedForm.ORNo || '',
        expirationDate: populatedForm?.expirationDate ? new Date(populatedForm.expirationDate).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'N/A',
        purpose: populatedForm.purpose || '',
        formNumber: populatedForm.formNumber,
        formDateIssued: populatedForm.dateIssued ? new Date(populatedForm.dateIssued).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'N/A',
        
        //business
        businessName: populatedForm?.business?.businessName,
        businessLocation: populatedForm?.business?.location,
        nature: populatedForm?.business?.natureOfBusiness,
        new: populatedForm?.business?.isNew ? 'New' : 'Renewal',
        plateNumber: populatedForm?.business?.plateNumber || '',
        cellphoneNumber: populatedForm?.business?.cellphoneNumber || '',
        closed: populatedForm?.business?.isClosed ? 'Closed' : 'Open',
        dateClosed: populatedForm?.business?.dateClosed ? new Date(populatedForm?.business?.dateClosed).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'N/A',

        //employment
        employmentCompanyName: populatedForm?.employment?.companyName || '',
        employmentLocation: populatedForm?.employment?.location || '',
        previousEmployment: populatedForm?.employment?.previousEmployment || '',
        employmentPosition: populatedForm?.employment?.position || '',
        dateLastEmployed: populatedForm?.employment?.dateLastEmployed ? new Date(populatedForm.employment.dateLastEmployed).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'N/A',

        //indigency
        indigencyRelationToBeneficiary: populatedForm?.indigency?.relationToBeneficiary || '',
        indigencyBeneficiaryName: populatedForm?.indigency?.beneficiaryName || '',

        //excavation
        excavationLocation: populatedForm?.excavation?.location || '',
        excavationTitleNumber: populatedForm?.excavation?.titleNumber || '',

        //building
        buildingLocation: populatedForm?.building?.location || '',
        buildingTitleNumber: populatedForm?.building?.titleNumber || '',

        //electrical
        electricalLocation: populatedForm?.electrical?.location || '',
        electricalAddress: populatedForm?.electrical?.address || '',
        electricalTitleNumber: populatedForm?.electrical?.titleNumber || '',

        //fencing
        fencingLocation: populatedForm?.fencing?.location || '',
        fencingAddress: populatedForm?.fencing?.address || '',

        //TODA
        todaModel: populatedForm?.TODA?.model || '',
        todaMotorNumber: populatedForm?.TODA?.motorNumber || '',
        todaChassisNumber: populatedForm?.TODA?.chassisNumber || '',
        todaNumberOfUnits: populatedForm?.TODA?.numberOfUnits || '',
        todaIncome: populatedForm?.TODA?.income || '',
        todaPlateNumber: populatedForm?.TODA?.plateNumber || '',

        //reconstruction
        reconstructionLocation: populatedForm?.reconstruction?.location || '',
        reconstructionTitleNumber: populatedForm?.reconstruction?.titleNumber || '',

        //PAO
        paoRelationToBeneficiary: populatedForm?.PAO?.relationToBeneficiary || '',
        paoBeneficiaryName: populatedForm?.PAO?.beneficiaryName || '',

        //zoning
        zoningLocation: populatedForm?.zoning?.location || '',
        zoningVehicle: populatedForm?.zoning?.vehicle || '',
        zoningPlateNumber: populatedForm?.zoning?.plateNumber || '',

        //lipatBahay
        lipatBahayOrigin: populatedForm?.lipatBahay?.origin || '',
        lipatBahayDestination: populatedForm?.lipatBahay?.destination || '',

        //lateBC
        lateBCMother: populatedForm?.lateBC?.mother || '',
        lateBCFather: populatedForm?.lateBC?.father || '',

        //coHabitation
        coHabitationResident1: populatedForm?.coHabitation?.resident1 || '',
        coHabitationResident2: populatedForm?.coHabitation?.resident2 || '',
        dateOfCohabitation: populatedForm?.coHabitation?.dateOfCoHabitation ? new Date(populatedForm?.coHabitation?.dateOfCoHabitation).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'N/A',
        coHabitationBlotterEntryNumber: populatedForm?.coHabitation?.blotterEntryNumber || '',
        coHabitationDateOfBlotter: populatedForm?.coHabitation?.dateOfBlotter ? new Date(populatedForm?.coHabitation?.dateOfBlotter).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'N/A',
        coHabitationNumberOfChildren: populatedForm?.coHabitation?.numberOfChildren,

        //calamity
        causeOfCalamity: populatedForm?.calamity?.causeOfCalamity || '',
        calamityDateOccured: populatedForm?.calamity?.dateOccured ? new Date(populatedForm?.calamity?.dateOccured).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'N/A',
    
        //ITR
        ITRIncomeMin: populatedForm?.ITR?.incomeMin || '',
        ITRIncomeMax: populatedForm?.ITR?.incomeMax || '',
    }

    if(populatedForm.isResident){
        dataToRender = {
            ...dataToRender,
            yrsOfResidency: populatedForm.residentID.yrsOfResidency,
            name: `${populatedForm.residentID.name.first} ${populatedForm.residentID.name.middle ? populatedForm.residentID.name.middle + ' ' : ''}${populatedForm.residentID.name.last}${populatedForm.residentID.name.suffix ? ' ' + populatedForm.residentID.name.suffix : ''}`,
            address: `${populatedForm.residentID.address.householdNumber || ''} ${populatedForm.residentID.address.streetName || ''} ${populatedForm.residentID.address?.apartment || ''} ${populatedForm.residentID?.address?.sitio ? 'Sitio ' + populatedForm.residentID?.address?.sitio : ''} Cacarong Matanda, Pandi, Bulacan`,
            dateOfBirth: new Date(populatedForm.residentID.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            placeOfBirth: populatedForm.residentID.placeOfBirth,
        }
    } else {
        dataToRender = {
            ...dataToRender,
            name: `${populatedForm.nonResident.name.first} ${populatedForm.nonResident.name.middle ? populatedForm.nonResident.name.middle + ' ' : ''}${populatedForm.nonResident.name.last}${populatedForm.nonResident.name.suffix ? ' ' + populatedForm.nonResident.name.suffix : ''}`,
            address: populatedForm.nonResident.address,
            dateOfBirth: new Date(populatedForm.nonResident.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            placeOfBirth: populatedForm.nonResident.placeOfBirth,
            yrsOfResidency: populatedForm.nonResident.yrsOfResidency || 'N/A',
        }
    }

    if(populatedForm.residentID && populatedForm.residentID.picture){
        dataToRender = {
            ...dataToRender,
            image: `../../${populatedForm.residentID.picture}`
        }
    }

    return dataToRender;
}

export default formDataToRender;