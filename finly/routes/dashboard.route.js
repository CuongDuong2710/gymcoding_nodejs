const express = require('express')
const router = express.Router()

const customersRouter = require('./customer.route')
const invoiceRouter = require('./invoice.route')
const { showDashboard } = require('../controllers/dashboard.controller')

router.get('/', showDashboard)

// The customers route will be nested below the /dashboard route, so you need to import this route on the dashboard.route.js
// http://localhost:3000/dashboard/customers
router.use('/customers', customersRouter)

router.use('/invoices', invoiceRouter)

module.exports = router