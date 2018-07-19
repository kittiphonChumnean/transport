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
            fninsertDoc(args.MessengerID,args.Date,args.Type,args.Location,args.Detail, function (data) {
                resolve(data)
            })
        })
    }
}

var fninsertDoc = function (MessengerID,Date,Type,Location,Detail, callback) {
    sql.close();
    console.log("MessengerID===="+MessengerID)
    
    sql.connect(dbConnect.dbConnect).then(pool => {
        var request = new sql.Request(pool)
        request.input('Mess',sql.VarChar,MessengerID)
        request.input('Date',sql.VarChar,Date)
        request.input('Type',sql.VarChar,Type)
        request.input('Location',sql.VarChar,Location)
        request.input('Detail',sql.VarChar,Detail)
        request.query("insert into DocumentToApp (MessengerID,Date,Type,Location,Detail) values ('"+MessengerID+"',@Date,'"+Type+"','"+Location+"','"+Detail+"')")
            .then(res => {
                console.log("query====2"+MessengerID)
                 console.log("test", res);
                sql.close();              
                    callback({ status: true })              
            })
    })
}

module.exports = {
    insertDoc:insertDoc
}