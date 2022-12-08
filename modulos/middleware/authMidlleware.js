// const authMiddleware = (req, res, nex) => {
//     if (req.session?.user) {
//         return nex()
//     }
//     return res.redirect('/login')
// }

const sessionExpirada = (req,res,nex)=>{
    if (req.session?.user){
        if(req.cookies.time){
            return nex()
        }
        req.session.destroy(error => {
            if (error) console.log(error)
        })
        return res.redirect('/login/expiro')
    }
    return res.redirect('/login')
}

module.exports = { sessionExpirada }