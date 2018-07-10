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
        Sale_Name: { type: GraphQLString },
        StoreZone: { type: GraphQLString },
        CustomerID: { type: GraphQLString },
        CustomerName: { type: GraphQLString },
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
            .query('SELECT DISTINCT INVOICEID,DELIVERYNAME,Customer_Address,Sale_Name,StoreZone,CustomerID,CustomerName FROM [Transfer-AX-ToWebTest] WHERE SaleID=@SaleID AND invoicedate= @invoicedate')
    }).then(res => {
        console.log("555555555555", res);
        sql.close()
        callback(res)
    })
}

// var inputType = new GraphQLObjectType({
//     name: 'inputType',
//     fields: () => ({
//         INVOICEID: { type: GraphQLString },
//         DELIVERYNAME: { type: GraphQLString },
//         Customer_Address: { type: GraphQLString },
//         Sale_Name: { type: GraphQLString },
//         StoreZone: { type: GraphQLString },
//         CustomerID: { type: GraphQLString },
//         CustomerName: { type: GraphQLString },
//     })
// })

// var inputStatusType = new GraphQLObjectType({
//     name: 'inputStatusType',
//     fields: () => ({
//         status: { type: GraphQLString }
//     })
// })

// var insertBill = {
//     type: inputStatusType,//new GraphQLList(inputStatusType),
//     args: {
//         inData: {
//             type: new GraphQLList(inputType),
//             args: {
//                 INVOICEID: { type: GraphQLString },
//                 DELIVERYNAME: { type: GraphQLString },
//                 Customer_Address: { type: GraphQLString },
//                 Sale_Name: { type: GraphQLString },
//                 StoreZone: { type: GraphQLString },
//                 CustomerID: { type: GraphQLString },
//                 CustomerName: { type: GraphQLString },
//             }
//         }
//     },
//     resolve: function (_, args) {
//         return new Promise(function (resolve, reject) {
//             // resolve({ status: "1" })
//             fnInsertData(args.inData, function (data) {
//                 resolve(data)
//             })
//         })
//     }
// }
// var fnInsertData = function (inData, callback) {
//     sql.close();
//     sql.connect(dbConnect.dbConnect).then(pool => {
//         // console.log("DB Connected",inData, inData.item)
//         var request = new sql.Request(pool)
//         var strVal=""
//         inData.forEach(function (val, i) {
//             // console.log("val", val);
//             request.input('inINVOICEID'+i, sql.VarChar, val.INVOICEID)
//             request.input('inDELIVERYNAME'+i, sql.VarChar, val.DELIVERYNAME)
//             request.input('inCustomer_Address'+i, sql.VarChar, val.Customer_Address)
//             request.input('inSale_Name'+i, sql.VarChar, val.Sale_Name)
//             request.input('inStoreZone'+i, sql.VarChar, val.StoreZone)
//             request.input('inCustomerID'+i, sql.VarChar, val.CustomerID)
//             request.input('inCustomerName'+i, sql.VarChar, val.CustomerName)
//             if(i+1==inData.length){
//                 strVal+="(@inINVOICEID"+i+",@inDELIVERYNAME"+i+",@inCustomer_Address"+i+",@inSale_Name"+i+",@inStoreZone"+i+",@inCustomerID"+i+",@inCustomerName"+i+")"
//             }else{
//                 strVal+="(@inINVOICEID"+i+",@inDELIVERYNAME"+i+",@inCustomer_Address"+i+",@inSale_Name"+i+",@inStoreZone"+i+",@inCustomerID"+i+",@inCustomerName"+i+"),"
//             }
//         });
//         request.query("INSERT INTO [dbo].[Transfer-AX-ToWebTest]" +
//             "([INVOICEID],[DELIVERYNAME],[Customer_Address],[Sale_Name],[StoreZone],[CustomerID],[CustomerName])" +
//             "VALUES" +
//             strVal).then(res => {
//                 // console.log("test", res);
//                 sql.close();
//                 if(res.rowsAffected>0){
//                     callback({status:"2"})
//                 }
//             })
//     })
// }

module.exports = {
    selectSale: selectSale,
    selectAllBill: selectAllBill,
    //insertBill: insertBill
}