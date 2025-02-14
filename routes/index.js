const express = require("express");
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedIn")
const productsModel = require("../models/productmodel");
const userModel = require("../models/usermodel");

router.get("/", (req, res) => {
    let error = req.flash("error");
    res.render("index", { error, loggedin: false })
})

router.get("/shop", isloggedin, async function(req, res) {
    let products =  await productsModel.find()
    let success = req.flash("success");
    res.render("shop", { products, success });
});

router.get("/cart", isloggedin, async function(req, res) {
    let user = await userModel.findOne({ email: req.user.email }).populate("cart");
    // console.log(user.cart);

    const bill = Number(user.cart[0].price) + 20 - Number(user.cart[0].discount);

    res.render("cart", {user, bill});
});

router.get("/addtocart/:id", isloggedin, async function(req, res) {
    let user = await userModel.findOne({email: req.user.email})
    user.cart.push(req.params.id);
    await user.save();
    req.flash("success", "Added to cart");
    res.redirect("/shop");
});

router.get("/logout", isloggedin, function(req, res) {
    res.render("/");
});

module.exports = router;