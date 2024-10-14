const express = require('express')
const router = express.Router()

const { showInvoices } = require('../controllers/invoice.controller')

router.get('/', showInvoices)

module.exports = router