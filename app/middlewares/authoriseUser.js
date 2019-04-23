

const authorizeAdminUser = (req,res,next) =>
{
    if ( req.user.roles.includes('admin'))
    {
        next()
    }
    else{
        res.status('403').send( {
            notice: 'The page doesnt exist'
        })
    }
}




module.exports = {
    authorizeAdminUser
}