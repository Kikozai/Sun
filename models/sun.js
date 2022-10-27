const MongoClient = require('mongodb').MongoClient
const url = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0"
const baza ='test1'

module.exports.getUser = function(email){
    return new Promise((reslove,reject)=>{
        MongoClient 
         .connect(url,function(err,client){
            if (err){
                reject(err)
            }
            client
            .db(baza)
            .collection('users')
            .find({"email":email})
            .toArray(function(err,results){
                if(err){
                    reject(err)
                }
                client.close()
                reslove(results)
            })

         })
    })
}

module.exports.getToken = function(token){
    return new Promise((resulve,reject)=>{
        MongoClient
        .connect(url,function(err,client){ 
            if(err){
                reject(err)
            }
            client
             .db(baza)
             .collection('token')
             .find({"token":token})
             .toArray(function(err,results){
                if(err){
                    reject(err)
                }
                client.close()
                reslove(results)
             })
        })
    })
}

module.exports.add = function(tabl,data){
    return new Promise((resovle,reject)=>{
        MongoClient
        .connect(url,function(err,client){
            if(err){
                reject(err)
            }
            client
            .db(baza)
            .collection(tabl)
            .insertOne(data,function(err,results){
                if(err){
                    reject(err)
                }
                client.close()
                resovle(results.ops[0])
            })
        })
    })
}

module.exports.delite = function(emai){
    return new Promise((resovle,reject)=>{
        //const id = new ObkectID(zadacaId)
        MongoClient
        .connect(url,function(err,client){
            if(err){
                reject(err)
            }
            client
            .db(baza)
            .collection('token')
            .deleteMany({"login": emai}),
            function(err,results){
                if(err){
                    reject(err)
                }
                client.close()
                resovle(results)
            }

        })
    })
}