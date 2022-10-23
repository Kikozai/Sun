const passport = require("passport");
const flash = require('flash')
passport.use(req,username,password,done);{
    // поиск пользователя в бд с помощью предоставленного имени пользователя 
    User.findOne({'username': username}, function(err,user){
        // в случае любых ошибок - возврат
         if(err){
            console.log('Error ib SingUp:'+ err)
            return done(err);
         }
         // уже существует 
         if(user){
            console.log('User already exists');
            return done(null,false,
                req.flash('message','User Already Exists'));
         }else{ 
            // если пользователя с таким атдесом электронной почти
            // в базе не существует, создать пользователя 
            var newUser = new User();
            // установка локальных прав доступа пользователя
            newUser.username = username;
            newUser.password = createHash(password);
            newUser.email = req.param('email');
            // сохранение пользователя 
            newUser.save(function(err){
                if(err){
                    console.log('Error in Saving user:'+err);
                    throw err;
                }
                console.log('User Reqitration succesful');
                return done(null,newUser)
            })
         }
    })
}
// Отложить исполение findOrCreateUser и выполнить 
// метот на следущем этапе цикла события 
process.nextTick(findOrCreateUser);
