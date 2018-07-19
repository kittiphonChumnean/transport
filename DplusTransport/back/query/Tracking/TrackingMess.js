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
//trackingMess
var tackMess = new GraphQLObjectType({
    name: 'tackMess',
    fields: () => ({
        MessengerID: { type: GraphQLString },
        Trip: { type: GraphQLInt },
        invoice: { type: GraphQLString },
        Date: { type: GraphQLString },
        Time: { type: GraphQLString },
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
            .query('SELECT DISTINCT Tracking.invoice, BillToApp.MessengerID,BillToApp.Trip,CONVERT(VARCHAR(10), CONVERT(DATETIME,Tracking.DateTime, 0), 101) as Date,CONVERT(VARCHAR(5),CONVERT(DATETIME,Tracking.DateTime, 0), 108) as Time,Tracking.status,Tracking.location FROM BillToApp,Tracking  WHERE BillToApp.messengerID = Tracking.messengerID AND Tracking.messengerID=@MessengerID AND datediff(day, Tracking.DateTime, @DateTime) = 0 AND Tracking.Trip=@Trip ORDER BY Date,Time')
    }).then(res => {
        console.log("555555555555", res);
        sql.close()
        callback(res)
    })
}

//statusMess
var statusMess = new GraphQLObjectType({
    name: 'statusMess',
    fields: () => ({
        statusA: { type: GraphQLString },
        allinvoice: { type: GraphQLString },
    })
})

var trackingStatusMess = {
    type: new GraphQLList(statusMess),
    args:{
        MessengerID:{type:GraphQLString},
        DateTime:{type:GraphQLString},
        Trip:{type:GraphQLInt},
    },
    resolve: function (_, args) {
        return new Promise(function (resolve, reject) {
            console.log("ค่า",args)
            fnSelectStatus(args.MessengerID,args.DateTime,args.Trip,function(data){
                resolve(data)
            })
        })
    }
}

var fnSelectStatus = function (MessengerID,DateTime,Trip,callback) {
    sql.connect(dbConnect.dbConnect).then(pool => {
        // console.log("DB Connected")
        return pool.request()
        .input('MessengerID',sql.VarChar,MessengerID)
        .input('DateTime',sql.VarChar,DateTime)
        .input('Trip',sql.Int,Trip)
        .input('A',sql.VarChar,"A%")
        .input('B',sql.VarChar,"B%")
            .query('select count(status) as statusA ,(select count(distinct invoice) from Tracking where messengerID=@MessengerID AND datediff(day, DateTime, @DateTime) = 0 AND Trip=@Trip)as  allinvoice FROM [Tracking] where messengerID=@MessengerID AND datediff(day, DateTime, @DateTime) = 0 AND Trip=@Trip and status like @A or status like @B')
    }).then(res => {
        console.log("555555555555", res);
        sql.close()
        callback(res)
    })
}

module.exports = {
    //selectMess: selectMess,
    trackingMess: trackingMess,
    trackingStatusMess: trackingStatusMess
}