const express = require('express')

const router = express.Router();

router.get("/", (req, res) => {
    res.send("hey shiv It's Working!")
})



module.exports = router;