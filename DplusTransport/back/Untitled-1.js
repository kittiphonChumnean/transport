var { dbconnect } = require('./connectdb/connectdb')
const { conn } = require('./connectdb/connectdb')
const sql = require('mssql')
const data = require('./connectdb/query')
const graphql = require('graphql')
const {
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean
} = graphql

var inputStatus = new GraphQLObjectType({
    name: 'inputStatus',
    fields:()=>({
       status: {type:GraphQLBoolean}
    })
})

var insertData = {
    type: inputStatus,
    args:{
        name:{type:GraphQLString}
    },
    resolve: function (_, args) {
        return new Promise(function (resolve, reject){
            const pool1 = new sql.ConnectionPool(conn, err => {
                pool1.request()
                .input('inCreatedata',sql.DateTime, new Date())
                    .query("insert into trainreact (name,createdate) values ('"+args.name+"',@inCreatedata)", (err, result) => {
                        console.log("result", result.rowsAffected);
                        if(result.rowsAffected[0] > 0){
                            resolve({status:true})
                            
                        }else{
                            resolve({status:false})
                        }
                        resolve (result)
                        sql.close();
                        // resolve ([{name:'testname'}]) คือการคืนค่าเอง
                    })
            })
        })
    }
}


module.exports={
    insertData:insertData

}