const express = require('express')

const router = express.Router();
const ownerModel = require('../models/ownermodel')
// process.env.NODE_ENV = process.env.NODE_ENV || 'development';
// for setting up node env we can use above command also and use below command that we need to run in teminal and set environment   $env:NODE_ENV="development"


if(process.env.NODE_ENV === "development"){  
    router.post("/create", async (req, res) => {
        let owners = await ownerModel.find()
        if(owners.length > 0) {
            return res
            .status(504)
            .send("You don't have permission to create a new owner!")
        }

        let {fullname, email, password} = req.body;

        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password
        });

        res.status(201).send(createdOwner)
    })
}



router.get("/admin", (req, res) => {
    let success =  req.flash("success")
    res.render("createproducts", { success })
})

// if(process.env === "development"){
//     console.log("hey"); 
// }




module.exports = router;