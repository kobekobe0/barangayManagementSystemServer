const formatCedula = async (receipt) => {
    let data = {}
    //loop through the receipt.items
    //and populate the data object
    //for example receipt.items[0].name == data.name1 and receipt.items[0].price == data.price1
    //and so on

    //format date like this mm-dd-yy


    receipt.items.forEach((item, index) => {
        data[`name${index + 1}`] = item.payor || ''
        data[`number${index + 1}`] = item.CTCNumber || ''
        data[`date${index + 1}`] = item.date ? new Date(item.date).toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' }) : '' 
        data[`indv${index + 1}`] = item.individual ? item.individual.toFixed(2).toLocaleString() : ''
        data[`corp${index + 1}`] = item.corporation ? item.corporation.toFixed(2).toLocaleString() : ''
        data[`rpt${index + 1}`] = item.rpt ? item.rpt.toFixed(2).toLocaleString() : ''
        data[`others${index + 1}`] = item.others ? item.others.toFixed(2).toLocaleString() : ''
        let total = item.individual + item.corporation + item.rpt + item.others;
        data[`totals${index + 1}`] = total !== null && total !== undefined ? total.toFixed(2).toLocaleString() : '';
    })

    data.bookletNumber = receipt.bookletNumber
    data.preparedBy = receipt.preparedBy
    data.dateFrom = receipt.dateFrom ? new Date(receipt.dateFrom).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''  
    data.dateTo = receipt.dateTo ? new Date(receipt.dateTo).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''
    
    
    let totalAmount = 0

    receipt.items.forEach(item => {
        totalAmount += item.individual + item.corporation + item.rpt + item.others
    })

    data.totalAmount = `₱ ${totalAmount.toFixed(2).toLocaleString()}`

    return data
}

export default formatCedula;