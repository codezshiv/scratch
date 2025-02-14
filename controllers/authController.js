const userModel = require('../models/usermodel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const { generateToken } = require("../utils/generateToken")



module.exports.registerUser = async (req, res) => {
    try {
        let { email, password, fullname } = req.body;

        let user = await userModel.findOne({email : email})

        if(user) {
            req.flash("User Already Exists!")
            res.redirect("/")
        } 

        bcrypt.genSalt(12, function(err, salt) {
            bcrypt.hash(password, salt, async function(err, hash) {
                if(err) {
                    req.flash("error", "Your Account Already Registered!")
                    res.redirect("/")
                }
                else {
                    let user = await userModel.create({
                        email,
                        password : hash,
                        fullname
                    });
            
                    let token = generateToken(user);
                    res.cookie("token", token);
                    // res.send("User Created Successfully!")
                    res.redirect("/")
            }
            })
        })
    
    } catch (error) {
        res.send(error.message);
    }
}

module.exports.loginUser = async (req, res) => {
    let {email, password} = req.body;

    let user = await userModel.findOne({email: email})

    if(!user) {
        req.flash("Email or Password incorrect")
        res.redirect("/") 
    } 
    
    await bcrypt.compare(password, user.password, function(err, result){
        if(result) {
            let token = generateToken(user);
            res.cookie("token", token);
            res.redirect("/shop")
        }
        else{
            req.flash("Email or Password incorrect")
            // res.status(500).send("You Can't Logged In!")
            res.redirect("/")
        }
    })
}

module.exports.logout = function (req, res) {
    res.cookie("token", "");
    res.redirect("/")
};

