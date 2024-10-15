const Customer = require('../lib/models/customer.model')
const Invoice = require('../lib/models/invoice.model')

const { body, validationResult } = require('express-validator')

const validateInvoice = [
    body('customer', 'Select the Customer').notEmpty(),
    body('amount', 'Amount must not be empty').notEmpty(),
    body('date', 'Due Date must not be empty').notEmpty(),
    body('status', 'Select the Status').notEmpty()
]

// populate() method is used to pull referenced document data. We pull the customer name for each invoice
const populateInvoices = query => {
    return query
    .populate({
        path: 'customer',
        model: Customer,
        select: '_id name'
    })
}

const showInvoices = async (req, res) => {
    const query = { owner: req.session.userId }

    const invoices = await  populateInvoices(Invoice.find(query))
    res.render('pages/invoices', {
        title: 'Invoices',
        type: 'data',
        invoices,
        info: req.flash('info')[0]
    })
}

const createInvoice = async (req, res) => {
    const validationErros = validationResult(req)

    if (!validationErros.isEmpty()) {
        const errors = validationErros.array()
        req.flash('errors', errors)
        req.flash('data', req.body)
    }

    const newInvoice = req.body
    newInvoice.owner = req.session.userId

    await Invoice.create(newInvoice)
    req.flash('info', {
        message: 'New Invoice Created',
        type: 'success'
    })
    res.redirect('/dashboard/invoices')
}

const editInvoice = async (req, res) => {
    const invoiceId = req.params.id
    const invoice = await populateInvoices(Invoice.findById(invoiceId))
    const { customers } = req 

    res.render('pages/invoices', {
        title: 'Edit Invoice',
        type: 'form',
        formAction: 'edit',
        customers,
        invoice: req.flash('data')[0] || invoice,
        errors: req.flash('errors')
    })
}

const updateInvoice = async (req, res) => {
    const validationErros = validationResult(req)
    if (!validationErros.isEmpty()) {
        const errors = validationErros.array()
        req.flash('errors', errors)
        req.flash('data', req.body)
        return res.redirect('edit')
    }

    const invoiceId = req.params.id
    const invoiceData = req.body

    await Invoice.findByIdAndUpdate(invoiceId, invoiceData)
    req.flash('info', {
        message: 'Invoice updated',
        type: 'success'
    })
    res.redirect('/dashboard/invoices')
}

const deleteInvoice = async (req, res) => {
    const invoiceId = req.params.id

    await Invoice.findByIdAndDelete(invoiceId)
    req.flash('info', {
        message: ' Invoice Deleted',
        type: 'success'
    })
    res.redirect('/dashboard/invoices')
}

// The customer data is attached to the `req.customers`. So the next middleware can access the data there.
const getCustomers = async (req, res, next) => {
    const customerQuery = { owner: req.session.userId }
    const customers = await Customer.find(customerQuery)
    req.customers = customers
    next()
}

module.exports = {
    showInvoices,
    createInvoice,
    validateInvoice,
    getCustomers,
    editInvoice,
    updateInvoice,
    deleteInvoice
}