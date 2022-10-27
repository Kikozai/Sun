    const express = require('express')
    const db = require('../models/sun')
    const bcrypt = require('bcryptjs')
    const  uuidv4 = require('uuid/v4')

    let auth = function(req,res,next){
        db 
          .getToken(req.headers.authorization)
          .then((results)=>{
            if(results.length == 0){
                const err = new Error('no auth!')
                err.status = 401;
                next(err)
            }else{
                next()
            }
          })
          .catch((err)=>{
            next(err);
          })
    }
    const isValidPassword = function(user,password){
        return bcrypt.compareSync(password,user.password)
    }
   router.get('/',(req,res)=>{
    res.render(homepage)
   })
   
   
    