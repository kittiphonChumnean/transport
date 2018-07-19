var dbConnect = require('../../connectdb/connectdb')
var sql = require('mssql')
var Request = require('tedious').Request;
const graphql = require('graphql')
const { GraphQLList, GraphQLFloat, GraphQLInt, GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLBoolean} = graphql
const utf8 = require('utf8');

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
    _MessengerID = utf8.encode(MessengerID)
    _Date = utf8.encode(Date)
    _Type = utf8.encode(Type)
    _Location = utf8.encode(Location)
    _Detail = utf8.encode(Detail)
    sql.close();
    sql.connect(dbConnect.dbConnect).then(pool => {
        var request = new sql.Request(pool)
        request.input('Mess',sql.VarChar,_MessengerID)
        request.input('Date',sql.VarChar,_Date)
        request.input('Type',sql.VarChar,_Type)
        request.input('Location',sql.VarChar,_Location)
        request.input('Detail',sql.VarChar,_Detail)
        request.query("insert into DocumentToApp (MessengerID,Date,Type,Location,Detail) values (@Mess,@Date,@Type,@Location,@Detail)")
            .then(res => {
                 console.log("test", res);
                sql.close();              
                    callback({ status: true })              
            })
    })
}

module.exports = {
    insertDoc:insertDoc
}