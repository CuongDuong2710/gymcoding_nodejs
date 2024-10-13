const express = require('express')
const router = express.Router()

const customersRouter = require('./customer.route')

router.get('/', (req, res) => {
    res.render('pages/dashboard', {
        title: 'Dashboard',
        info: req.flash('info')[0]
    })
})

// The customers route will be nested below the /dashboard route, so you need to import this route on the dashboard.route.js
// http://localhost:3000/dashboard/customers
router.use('/customers', customersRouter)

module.exports = router