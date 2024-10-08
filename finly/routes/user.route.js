const express = require('express')
const router = express.Router()
const { validateSignup, signup } = require('../controllers/user.controller')

router.get('/', (req, res) => {
    res.render('pages/index', { title: 'Finly' })
})

router.get('/login', (req, res) => {
    res.render('pages/login', { title: 'Sign in' })
})

router.get('/signup', (req, res) => {
    res.render('pages/signup', {
        title: 'Sign up',
        user: req.flash('data')[0],
        info: req.flash('info')[0],
        errors: req.flash('errors')}) // get value from key 'errors'
})

// the validator array needs to be called before the signup() process
router.post('/signup', validateSignup, signup)

module.exports = router