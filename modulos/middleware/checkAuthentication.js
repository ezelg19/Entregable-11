const checkAuthentication = (req, res, nex) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login?iniciar=iniciar')
    }
    return nex()
}

module.exports = { checkAuthentication }