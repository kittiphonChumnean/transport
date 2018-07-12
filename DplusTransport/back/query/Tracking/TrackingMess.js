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

var tackMess = new GraphQLObjectType({
    name: 'tackMess',
    fields: () => ({
        MessengerID: { type: GraphQLString },
        StoreZone: { type: GraphQLString },
        Trip: { type: GraphQLInt },
        invoice: { type: GraphQLString },
        DateTime: { type: GraphQLString },
        status: { type: GraphQLString },
        location: { type: GraphQLString },
    })
})

var trackingMess = {
    type: new GraphQLList(tackMess),
    args:{
        MessengerID:{type:GraphQLString},
        DateTime:{type:GraphQLString},
        Trip:{type:GraphQLInt},
    },
    resolve: function (_, args) {
        return new Promise(function (resolve, reject) {
            console.log("ค่า",args)
            fnSelectData(args.MessengerID,args.DateTime,args.Trip,function(data){
                resolve(data)
            })
        })
    }
}

var fnSelectData = function (MessengerID,DateTime,Trip,callback) {
    sql.connect(dbConnect.dbConnect).then(pool => {
        // console.log("DB Connected")
        return pool.request()
        .input('MessengerID',sql.VarChar,MessengerID)
        .input('DateTime',sql.VarChar,DateTime)
        .input('Trip',sql.Int,Trip)
            .query('SELECT DISTINCT Tracking.invoice, BillToApp.MessengerID,BillToApp.StoreZone,BillToApp.Trip,DateTime = CONVERT(varchar,Tracking.DateTime),Tracking.status,Tracking.location FROM BillToApp,Tracking WHERE BillToApp.messengerID = Tracking.messengerID AND Tracking.messengerID=@MessengerID AND datediff(day, Tracking.DateTime, @DateTime) = 0 AND Tracking.Trip=@Trip ORDER BY DateTime')
    }).then(res => {
        console.log("555555555555", res);
        sql.close()
        callback(res)
    })
}

module.exports = {
    selectMess: selectMess,
    trackingMess: trackingMess
}