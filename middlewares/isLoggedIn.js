const jwt = require('jsonwebtoken')
const userModel = require("../models/usermodel")

module.exports = async function (req, res, next) {
    if(!req.cookies.token){
        res.flash("error", "You Need To Login First!")
        return res.redirect("/")
    }

    try{
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user = await userModel
        .findOne({email: decoded.email })
        .select("-password");
        req.user = user;
        next();
    }
    catch(error){
        req.flash("error", "Something Went Wrong!");
        res.redirect("/")
    }
};