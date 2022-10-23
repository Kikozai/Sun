const express = require('express');
const sqlite = require('sqlite3');
const passport = require('passport');
const session = require('express-session');
const { UsersManager } = require('auth0');


app = express();

let db = new sqlite.Database('./db/sun.db',(err)=>{
    if(err){
        console.error(err.message)
    }else{
        console.log('database is worked')
    }
})

// Конфигурация для passport
app.use(session({secret:'mySecretKey'}));
app.use(passport.initialize())
app.use(passport.session);


passport.serializeUser(function(user,done){
    done(null,user._id);
});
passport.deserializeUser(function(id,done){
    User.findBtId(id,function(err,user){
        done(err,user);
    })
})