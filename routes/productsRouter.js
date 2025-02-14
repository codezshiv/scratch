const express = require('express')
const upload = require("../config/multer-config")
const productsModel = require('../models/productmodel')
const router = express.Router();

router.post("/create", upload.single("image") , async (req, res) => {

   try {
     let { name, price, discount, bgcolor,panelcolor,textcolor} = req.body;
 
     let products = await productsModel.create({
         image: req.file.buffer,
         name,
         price,
         discount,
         bgcolor,
         panelcolor,
         textcolor
     })

     req.flash("success", "Product Create Successfully!")
     res.redirect("/owners/admin")
   } catch (error) {
        res.send(error.message);
   }
})



module.exports = router;