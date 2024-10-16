const Customer = require('../lib/models/customer.model')
const Invoice = require('../lib/models/invoice.model')
const { USDollar } = require('../lib/formatter')

const { body, validationResult } = require('express-validator')

const validateInvoice = [
    body('customer', 'Select the Customer').notEmpty(),
    body('amount', 'Amount must not be empty').notEmpty(),
    body('date', 'Due Date must not be empty').notEmpty(),
    body('status', 'Select the Status').notEmpty()
]

// populate() method is used to pull referenced document data. We pull the customer name for each invoice
const populateInvoices = (query, search) => {
    const populateOptions = {
        path: 'customer',
        model: Customer,
        select: '_id name'
    }
    if (search) {
        populateOptions['match'] = { name: { $regex: search, $options: 'i' } }
    }
    // The customer property will be null when the customer data doesn't match the search value
    // So you need to filter the invoice data and remove all invoices that have the customer value of null
    return query
    .populate(populateOptions)
    .then(invoices => invoices.filter(invoices => invoices.customer != null))
}

const showInvoices = async (req, res) => {
    const query = { owner: req.session.userId }
    const { search } = req.query

    const invoices = await populateInvoices(Invoice.find(query), search)
    res.render('pages/invoices', {
        title: 'Invoices',
        type: 'data',
        invoices,
        USDollar,
        info: req.flash('info')[0] // get `info` from createInvoice and updateInvoice
    })
}

const createInvoice = async (req, res) => {
    const validationErrors = validationResult(req)

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array()
        req.flash('errors', errors)
        req.flash('data', req.body)
        return res.redirect('create')
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
    const validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array()
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