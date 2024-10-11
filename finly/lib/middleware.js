// When unauthenticated users try to access dashboard, they will be redirected to login page
const verifyUser = (req, res, next) => {
    if (!req.session.userId) {
        return res.redirect('/login')
    }
    next()
}

// redirect to dashboard if user signed up or logged in
const redirectAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        return res.redirect('/dashboard')
    }
    next() // important to load page
}

module.exports = {
    verifyUser,
    redirectAuthenticated
}