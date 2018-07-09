var dbConnect = require('../../connectdb/connectdb')
var sql = require('mssql')
var Request = require('tedious').Request;
const graphql = require('graphql')
const { GraphQLList, GraphQLFloat, GraphQLInt, GraphQLObjectType, GraphQLSchema, GraphQLString, } = graphql


var allSale = new GraphQLObjectType({
    name: 'allSale',
    fields: () => ({
        SaleID: { type: GraphQLString }
    })
})

var selectSale = {
    type: new GraphQLList(allSale),
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
            .query('SELECT DISTINCT  SaleID FROM [Transfer-AX-ToWebTest]')
    }).then(res => {
        sql.close()
        callback(res)

    })

    sql.on('error', err => {
        // ... error handler
        callback(err)
    })
}

var allBill = new GraphQLObjectType({
    name: 'allBill',
    fields: () => ({
        INVOICEID: { type: GraphQLString },
        DELIVERYNAME: { type: GraphQLString },
        Customer_Address: { type: GraphQLString },
    })
})

var selectAllBill = {
    type: new GraphQLList(allBill),
    args:{
        SaleID:{type:GraphQLString},
        invoicedate:{type:GraphQLString},
    },
    resolve: function (_, args) {
        return new Promise(function (resolve, reject) {
            console.log("ค่า",args)
            fnSelectAllBill(args.SaleID,args.invoicedate,function(data){
                resolve(data)
            })
        })
    }
}

var fnSelectAllBill = function (SaleID,invoicedate,callback) {
    sql.connect(dbConnect.dbConnect).then(pool => {
        // console.log("DB Connected")
        return pool.request()
        .input('SaleID',sql.VarChar,SaleID)
        .input('invoicedate',sql.VarChar,invoicedate)
            .query('SELECT INVOICEID,DELIVERYNAME,Customer_Address FROM [Transfer-AX-ToWebTest] WHERE SaleID=@SaleID AND invoicedate= @invoicedate')
    }).then(res => {
        console.log("555555555555", res);
        sql.close()
        callback(res)
    })
}

module.exports = {
    selectSale: selectSale,
    selectAllBill: selectAllBill
}