const formatReceipt = async (receipt) => {
    let data = {}
    //loop through the receipt.items
    //and populate the data object
    //for example receipt.items[0].name == data.name1 and receipt.items[0].price == data.price1
    //and so on

    //format date like this mm-dd-yy


    receipt.items.forEach((item, index) => {
        data[`name${index + 1}`] = item.name || ''
        data[`amount${index + 1}`] = item.amount ? item.amount.toFixed(2).toLocaleString() : ''
        data[`number${index + 1}`] = item.ORNumber || ''
        data[`item${index + 1}`] = item.nature || ''
        //format date like this mm-dd-yy
        data[`date${index + 1}`] = item.date ? new Date(item.date).toLocaleString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' }) : '' 
    })

    data.bookletNumber = receipt.bookletNumber
    data.preparedBy = receipt.preparedBy
    
    let totalAmount = 0

    receipt.items.forEach(item => {
        totalAmount += item.amount
    })

    data.totalAmount = `${totalAmount.toFixed(2).toLocaleString()}`

    return data
}

export default formatReceipt;