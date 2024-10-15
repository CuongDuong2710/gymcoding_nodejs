const Customer = require('../lib/models/customer.model')
const Invoice = require('../lib/models/invoice.model')

const { USDollar } = require('../lib/formatter')

const showDashboard = async (req, res) => {
    const query = { owner: req.session.userId }

    const invoiceCount = await Invoice.countDocuments(query)
    const customerCount = await Customer.countDocuments(query)

    // get all invoices created by owner and pull the customer name
    const allInvoices = await Invoice.find(query)
    .populate({
        path: 'customer',
        model: Customer,
        select: '_id name'
    })

    const totalPaid = allInvoices.reduce((sum, invoice) => {
        return invoice.status === 'paid' ? sum + invoice.amount : sum
    }, 0)

    const totalPending = allInvoices.reduce((sum, invoice) => {
        return invoice.status === 'pending' ? sum + invoice.amount : sum
    }, 0)

    res.render('pages/dashboard', {
        title: 'Dashboard',
        invoiceCount,
        customerCount,
        totalPaid,
        totalPending,
        USDollar,
        infor: req.flash('info')[0]
    })
}

module.exports = {
    showDashboard
}