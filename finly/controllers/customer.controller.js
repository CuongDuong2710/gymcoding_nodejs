const Customer = require('../lib/models/customer.model')

const { body, validationResult } = require('express-validator')

const validateCustomer = [
    body('name', 'Name must not be empty').notEmpty(),
    body('email', 'Email must not be empty').notEmpty(),
    body('phone', 'Phone must not be empty').notEmpty(),
    body('address', 'Address must not be empty').notEmpty()
]

const showCustomers = async (req, res) => {
    const query = { owner: req.session.userId }
    const customers = await Customer.find(query)

    res.render('pages/customers', {
        title: 'Customer',
        type: 'data',
        customers,
        info: req.flash('info')[0]
    })
}

const createCustomer = async (req, res) => {
    const validationErrors = validationResult(req)
    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array()
        req.flash('errors', errors)
        req.flash('data', req.body)
        return res.redirect('create')
    }

    const newCustomer = req.body
    newCustomer.owner = req.session.userId

    await Customer.create(newCustomer)
    req.flash('info', {
        message: 'Customer Created',
        type: 'success'
    })
    res.redirect('/dashboard/customers')
}

module.exports = {
    validateCustomer,
    showCustomers,
    createCustomer
}