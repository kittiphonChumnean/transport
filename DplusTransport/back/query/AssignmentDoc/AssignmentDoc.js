var dbConnect = require('../../connectdb/connectdb')
var sql = require('mssql')
var Request = require('tedious').Request;
const graphql = require('graphql')
const { GraphQLList, GraphQLFloat, GraphQLInt, GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLBoolean} = graphql

var inputStatusType = new GraphQLObjectType({
    name: 'inputStatusTypeDoc', 
    fields: () => ({
        status: {type: GraphQLBoolean}
    })
})

var insertDoc={
    type:inputStatusType,
    args:{
        MessengerID: {type: GraphQLString},
        Date: {type: GraphQLString},
        Type: {type: GraphQLString},
        Location: {type: GraphQLString},
        Detail: {type: GraphQLString}
    },
    resolve: function (_, args) {
        return new Promise(function (resolve, reject){
            console.log("ค่า",args)
            const pool1 = new sql.ConnectionPool(dbConnect, err => {
                pool1.request()
                    .input('@Mess',sql.DateTime,args.MessengerID)
                    .input('@Date',sql.DateTime,args.Date)
                    .input('@Type',sql.DateTime,args.type)
                    .input('@Location',sql.DateTime,args.Location)
                    .input('@Detail',sql.DateTime,args.Detail)
                        .query("insert into DocumentToApp (MessengerID,Date,Type,Location,Detail) values (@Mess,@Date,@Type,@Location,@Detail)", (err, result) => {
                        console.log("result", result.rowsAffected);
                        if(result.rowsAffected[0] > 0){
                            resolve({status:true})
                        }else{
                            resolve({status:false})
                        }
                        sql.close();
                        // resolve ([{name:'testname'}]) คือการคืนค่าเอง
                    })
            })
        })
    }
}

module.exports = {
    insertDoc:insertDoc
}