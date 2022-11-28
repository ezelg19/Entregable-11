const authMiddleware = (req, res, nex) => {
    if (req.session?.user) {
        nex()
    }
    return res.render('register', { root: __dirname })
}


module.exports = { authMiddleware }