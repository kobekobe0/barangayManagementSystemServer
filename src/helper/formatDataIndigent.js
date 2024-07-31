const formatIndigent = async (indigents) => {
    let data = {
        arr: [],
        totalAmount: 0,
    }

    console.log(indigents)

    indigents.forEach((indigent, index) => {
        data.arr.push({
            name: indigent?.patient?.name.first + ' ' + indigent?.patient?.name.middle + ' ' + indigent?.patient?.name.last || '',
            amount: indigent.amount ? indigent.amount.toFixed(2).toLocaleString() : '',
            problem: indigent.problem || '',
            date: indigent.approvedAt ? new Date(indigent.approvedAt).toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' }) : ''
        })
        data.totalAmount += indigent.amount || 0
    })


    return data
}

export default formatIndigent;