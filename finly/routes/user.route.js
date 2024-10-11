const express = require('express')
const router = express.Router()
const { validateSignup, signup, login, validateLogin, logout } = require('../controllers/user.controller')

router.get('/', (req, res) => {
    res.render('pages/index', {
        title: 'Finly',
        info: req.flash('info')[0]
    })
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
    
router.get('/login', (req, res) => {
    res.render('pages/login', {
        title: 'Sign in',
        user: req.flash('data')[0],
        info: req.flash('info')[0],
        errors: req.flash('erros')
    })
})

router.post('/login', validateLogin, login)

router.get('/logout', logout)

module.exports = router