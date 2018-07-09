var dbConnect = require('../../connectdb/connectdb')
var sql = require('mssql')
var Request = require('tedious').Request;
const graphql = require('graphql')
const { GraphQLList, GraphQLFloat, GraphQLInt, GraphQLObjectType, GraphQLSchema, GraphQLString, } = graphql

var GetTeskModel = new GraphQLObjectType({
    name: 'GetTeskModel',
    fields: () => ({
        INVOICEID: { type: GraphQLString },
        QTYbox: { type: GraphQLInt },
        CustomerName: { type: GraphQLString },
    })
})

var selectGetTesk = {
    type: new GraphQLList(GetTeskModel),
    args:{
        DocumentSet:{type:GraphQLString},
    },
    resolve: function (_, args) {
        return new Promise(function (resolve, reject) {
            console.log("ค่า",args)
            fnSelectGetTesk(args.DocumentSet,function(data){
                resolve(data)
            })
        })
    }
}

var fnSelectGetTesk = function (DocumentSet,callback) {
    sql.connect(dbConnect.dbConnect).then(pool => {
        // console.log("DB Connected")
        return pool.request()
        .input('DocumentSet',sql.VarChar,DocumentSet)
            .query(' SELECT  [INVOICEID],[CustomerName],[QTYbox] FROM [ConfirmBill] WHERE DocumentSet=@DocumentSet AND [Status] = 1')
    }).then(res => {
        console.log("555555555555", res);
        sql.close()
        callback(res)
    })
}


var upDateStateGetTeskModel = new GraphQLObjectType({
    name: 'upDateStateGetTesk',
    fields: () => ({
        Status: { type: GraphQLInt }
    })
})

var upDateStateGetTesk = {
    type: new GraphQLList(upDateStateGetTeskModel),
    args: {
        DocumentSet:{type:GraphQLString},
    },
    resolve: function (_, args) {
        return new Promise(function (resolve, reject) {
            fnUpDateStateGetTesk( args.DocumentSet,function ( data) {
                resolve(data)
            })
        })
    }
}


var fnUpDateStateGetTesk = function ( DocumentSet,callback) {
    sql.connect(dbConnect.dbConnect).then(pool => {
        // console.log("DB Connected")
        return pool.request()
        .input('DocumentSet', sql.VarChar,DocumentSet)
            .query('UPDATE [ConfirmBill] SET [Status] = 2  WHERE DocumentSet = @DocumentSet ' )
    }).then(res => {
        console.log("Success");
        sql.close()
        callback(res)

    })

    sql.on('error', err => {
        // ... error handler
        callback(err)
    })
}


module.exports = {
    selectGetTesk:selectGetTesk,
    upDateStateGetTesk:upDateStateGetTesk,
    
}