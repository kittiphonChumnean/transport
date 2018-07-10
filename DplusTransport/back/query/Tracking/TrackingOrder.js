var dbConnect = require('../../connectdb/connectdb')
var sql = require('mssql')
var Request = require('tedious').Request;
const graphql = require('graphql')
const { GraphQLList, GraphQLFloat, GraphQLInt, GraphQLObjectType, GraphQLSchema, GraphQLString, } = graphql

var Order = new GraphQLObjectType({
    name: 'Order',
    fields: () => ({
        invoice: { type: GraphQLString },
        Date: { type: GraphQLString },
        Time: { type: GraphQLString },
        status: { type: GraphQLString },
        location: { type: GraphQLString },
        MessengerID: { type: GraphQLString },
        CustomerName: { type: GraphQLString },
        AddressShipment: { type: GraphQLString },
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
            .query('SELECT BillToApp.MessengerID,BillToApp.CustomerName,BillToApp.AddressShipment,Tracking.invoice,Tracking.Date,Tracking.Time,Tracking.status,Tracking.location FROM BillToApp,Tracking WHERE BillToApp.INVOICEID = Tracking.invoice AND Tracking.invoice=@INVOICEID ORDER BY Date ,Time')
    }).then(res => {
        console.log("555555555555", res);
        sql.close()
        callback(res)
    })
}

module.exports = {
    selectOrder: selectOrder
}