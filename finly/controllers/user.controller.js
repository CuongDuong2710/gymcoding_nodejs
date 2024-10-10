const User = require('../lib/models/user.model')
const { body, validationResult } = require('express-validator')

const validateSignup = [
    body('email', 'Email must not be empty').notEmpty(),
    body('password', 'Password must not be empty').notEmpty(),
    body('password', 'Password must be 6+ characters long').isLength({ min: 6 }),
    body('repeatPassword', 'Repeat Password must not be empty').notEmpty(),
    body('repeatPassword', 'Password do not match').custom((value, { req }) => (
        value === req.body.password
    )),
]

const signup = async (req, res) => {
    const validationErrors = validationResult(req)
    const { email, password } = req.body
    const query = { email }

    if (!validationErrors.isEmpty()) {
        const errors = validationErrors.array()
        req.flash('errors', errors) // key-value pairs to store the message
        return res.redirect('/signup')
    }

    const existingUser = await User.findOne(query)
    if (existingUser) {
        // Email already exists
        res.redirect('/signup')
    } else {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = {
            email,
            password: hashedPassword
        }

        const result = await User.create(user)
        req.session.userId = result._id
        res.redirect('/dashboard') 
    }
}

module.export = {
    signup,
    validateSignup
}