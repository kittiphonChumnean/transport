var dbConnect = require('../connectdb/connectdb')
var sql = require('mssql')
var Request = require('tedious').Request;
const graphql = require('graphql')
const { GraphQLList, GraphQLFloat, GraphQLInt, GraphQLObjectType, GraphQLSchema, GraphQLString, } = graphql

var allinsertData = new GraphQLObjectType({
    name: 'allinsertData',
    fields: () => ({
        
        name: { type: GraphQLString }
       
    })
})


var insertData = {
    type: new GraphQLList(allinsertData),
    args: {
        name: { type: GraphQLString }
    },
    resolve: function (_, args) {
        return new Promise(function (resolve, reject) {
            fninsertData( args.name,function ( data) {
                resolve(data)
            })
        })
    }
}

var fninsertData = function ( name,callback) {
    sql.connect(dbConnect.dbConnect).then(pool => {
        // console.log("DB Connected")
        return pool.request()
        .input('inName', sql.VarChar, name)
            .query('INSERT INTO [dbo].[trainreact]([name]) VALUES (@inName)')
    }).then(res => {
        console.log("test", res);
        sql.close()
        callback(res)

    })

    sql.on('error', err => {
        // ... error handler
        callback(err)
    })
}

module.exports = {
    insertData:insertData
}