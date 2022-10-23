const flash = require('flash');
const { isValid } = require('ipaddr.js');
const passport = require("passport");
const localStrategy = require('passport-local').Strategy
passport.use('login', new localStrategy({
    passReqToCallback: true
    
},
function(req,username,password,done){
    // проверка существует ли пользователь с таким логином
    User.findOne({'username': username},
    function(err,user){
        if(err)
        //В случае возникновения ошибки, возврат с помощью метода done
        return done(err);
        // пользователь не существует, ошибка входа и перенаправление обратно
        if(!user){
            console.log('User Not Found with username'+username);
            return done(null,false,
                req.flash('message','Invalid Password'))
}
// пользователь существует, но пароль введен неверно,ошибка входа
 if(!isValidPassword(user,password)){
    console.log('Invalid Password');
    return done(null,false,
        req.flash('message','Invalid Password'));
 }
 // Пользователь существует и пароль верен,возврат пользователя из \
 // метода done, что будет озночать успешеную аутентификацию 
 return done(null,user);
}
);
}))