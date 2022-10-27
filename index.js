const express = require('express')
const bodyparser = require('body-parser')
const router = require('./routes')

const app = express()

app.use('/',router)
app.use(express.static(__dirname + '/styles'));


app.use(bodyparser.urlencoded(({extended:true})))
app.use(bodyparser.json())

app.use(function(req,res,next){
    const err = new Error ('no found')
    err.status = 404;
    next(err)
})

app.use(function(err,req,res,next){
    res.status(err.status || 500)
    res.json({
        message: err.message,
        error: err
    })
})

app.listen(8080, function(){
    console.log('server has been started')
})