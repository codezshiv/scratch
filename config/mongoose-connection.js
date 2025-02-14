const mongoose = require('mongoose');
const config = require('config');
const dbgr = require('debug')('development:mongoose');
// debug.enable('development:mongoose');
// const dbgr = debug('development:mongoose');

// for setting env in window we can use $env:DEBUG="development:*" this command and set our environment to developement



mongoose
.connect(`${config.get("MONGODB_URL")}/scatch`)
.then(function(){
    dbgr("Connected");
})
.catch(function(err){
    dbgr(err);
})

module.exports = mongoose.connection;