var dbConnect = require('../../connectdb/connectdb')
var sql = require('mssql')
var Request = require('tedious').Request;
const graphql = require('graphql')
const { GraphQLList, GraphQLFloat, GraphQLInt, GraphQLObjectType, GraphQLSchema, GraphQLString, } = graphql

//trackingOrder
var Order = new GraphQLObjectType({
    name: 'Order',
    fields: () => ({
        invoice: { type: GraphQLString },
        Date: { type: GraphQLString },
        Time: { type: GraphQLString },
        status: { type: GraphQLString },
        location: { type: GraphQLString },
    })
})

var selectOrder = {
    type: new GraphQLList(Order),
    args:{
        INVOICEID:{type:GraphQLString}
    },
    resolve: function (_, args) {
        return new Promise(function (resolve, reject) {
            console.log("ค่า",args)
            fnSelectOrder(args.INVOICEID,function(data){
                resolve(data)
            })
        })
    }
}

var fnSelectOrder = function (INVOICEID,callback) {
    sql.connect(dbConnect.dbConnect).then(pool => {
        // console.log("DB Connected")
        return pool.request()
        .input('INVOICEID',sql.VarChar,INVOICEID)
            .query('SELECT invoice, CONVERT(VARCHAR(10), CONVERT(DATETIME,DateTime, 0), 101) as Date, ' + 
                   ' CONVERT(VARCHAR(5),CONVERT(DATETIME,DateTime, 0), 108) as Time, '+
                   ' status,location FROM Tracking WHERE invoice = @INVOICEID Order by Date,Time')
    }).then(res => {
        console.log("555555555555", res);
        sql.close()
        callback(res)
    })
}

//dataMess
var DataMess = new GraphQLObjectType({
    name: 'DataMess',
    fields: () => ({
        MessengerID: { type: GraphQLString },
        CustomerName: { type: GraphQLString },
        AddressShipment: { type: GraphQLString },
    })
})

var selectDataMess = {
    type: new GraphQLList(DataMess),
    args:{
        INVOICEID:{type:GraphQLString}
    },
    resolve: function (_, args) {
        return new Promise(function (resolve, reject) {
            //console.log("ค่า",args)
            fnselectDataMess(args.INVOICEID,function(data){
                resolve(data)
            })
        })
    }
}

var fnselectDataMess = function (INVOICEID,callback) {
    sql.connect(dbConnect.dbConnect).then(pool => {
        // console.log("DB Connected")
        return pool.request()
        .input('INVOICEID',sql.VarChar,INVOICEID)
            .query('SELECT MessengerID,CustomerName,AddressShipment FROM BillToApp WHERE INVOICEID =@INVOICEID')
    }).then(res => {
        //console.log("555555555555", res);
        sql.close()
        callback(res)
    })
}

module.exports = {
    selectOrder: selectOrder,
    selectDataMess: selectDataMess
}