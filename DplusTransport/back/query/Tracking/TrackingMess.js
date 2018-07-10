var dbConnect = require('../../connectdb/connectdb')
var sql = require('mssql')
var Request = require('tedious').Request;
const graphql = require('graphql')
const { GraphQLList, GraphQLFloat, GraphQLInt, GraphQLObjectType, GraphQLSchema, GraphQLString, } = graphql

var allMess = new GraphQLObjectType({
    name: 'allMess',
    fields: () => ({
        IDMess: { type: GraphQLString }
    })
})

var selectMess = {
    type: new GraphQLList(allMess),
    resolve: function (_, args) {
        return new Promise(function (resolve, reject) {
            fnSelectAllData(function (data) {
                resolve(data)
            })
        })
    }
}

var fnSelectAllData = function (callback) {
    sql.connect(dbConnect.dbConnect).then(pool => {
        // console.log("DB Connected")
        return pool.request()
            .query('SELECT DISTINCT IDMess FROM [Messenger]')
    }).then(res => {
        sql.close()
        callback(res)

    })

    sql.on('error', err => {
        // ... error handler
        callback(err)
    })
}

module.exports = {
    selectMess: selectMess
}