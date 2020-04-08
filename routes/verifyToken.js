const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) =>{
    const token = req.header('Authorization');
    if(!token) return res.status(401).send('Access Denied');
    try{
        const verified= jwt.verify(token,process.env.SECRET_TOKEN);
        req.user= verified;
        next();
    }catch(err){
        res.status(400).send('Please login again.');
    }
}

module.exports = verifyToken