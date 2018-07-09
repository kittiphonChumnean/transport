var dbConnect = require('../../connectdb/connectdb')
var sql = require('mssql')
var Request = require('tedious').Request;
const graphql = require('graphql')
const { GraphQLList, GraphQLFloat, GraphQLInt, GraphQLObjectType, GraphQLSchema, GraphQLString, } = graphql

//selectIDMess
var IDMessmodel = new GraphQLObjectType({
    name: 'IDMessmodel',
    fields: () => ({
        IDMess: { type: GraphQLString },
    })
})

var selectIDMess = {
    type: new GraphQLList(IDMessmodel),
    resolve: function (_, args) {
        return new Promise(function (resolve, reject) {
            console.log("ค่า",args)
            fnselectIDMess(function(data){
                resolve(data)
            })
        })
    }
}

var fnselectIDMess = function (callback) {
    sql.connect(dbConnect.dbConnect).then(pool => {
        // console.log("DB Connected")
        return pool.request()
       
     .query('SELECT  [IDMess] FROM [Messenger]')
    }).then(res => {
        console.log("555555555555", res);
        sql.close()
        callback(res)
    })
}

//Search  meses
var Messmodel = new GraphQLObjectType({
    name: 'Messmodel',
    fields: () => ({
        Zone: { type: GraphQLString },
    })
})

var selecMess = {
    type: new GraphQLList(Messmodel),
    args:{
        IDMess:{type:GraphQLString},
    },
    resolve: function (_, args) {
        return new Promise(function (resolve, reject) {
            console.log("ค่า",args)
            fnSelecMess(args.IDMess,function(data){
                resolve(data)
            })
        })
    }
}


var fnSelecMess = function (IDMess,callback) {
    sql.connect(dbConnect.dbConnect).then(pool => {
        // console.log("DB Connected")
        return pool.request()
        .input('IDMess',sql.VarChar,IDMess)
            .query('SELECT [Zone] FROM [Messenger] WHERE IDMess = @IDMess')
    }).then(res => {
        console.log("555555555555", res);
        sql.close()
        callback(res)
    })
}


//Search  DataInvoice
var invoiceModel = new GraphQLObjectType({
    name: 'invoiceModel',
    fields: () => ({
        INVOICEID: { type: GraphQLString },
        DocumentSet: { type: GraphQLString },
        CustomerID: { type: GraphQLString },
        CustomerName: { type: GraphQLString },
        AddressShipment: { type: GraphQLString },
        SaleID: { type: GraphQLString },
        Sale_Name: { type: GraphQLString },
        StoreZone: { type: GraphQLString },
       
    })
})

var selectinvoice = {
    type: new GraphQLList(invoiceModel),
    args:{
        INVOICEID:{type:GraphQLString},
    },
    resolve: function (_, args) {
        return new Promise(function (resolve, reject) {
            console.log("ค่า",args)
            fnSelectinvoice(args.INVOICEID,function(data){
                resolve(data)
            })
        })
    }
}

var fnSelectinvoice = function (INVOICEID,callback) {
    sql.connect(dbConnect.dbConnect).then(pool => {
        // console.log("DB Connected")
        return pool.request()
        .input('INVOICEID',sql.VarChar,INVOICEID)
            .query('SELECT [INVOICEID],[DocumentSet],[CustomerID],[CustomerName],[AddressShipment],[SaleID],[Sale_Name],[StoreZone]FROM [ConfirmBill] WHERE Status=2 AND INVOICEID = @INVOICEID')
    }).then(res => {
        console.log("555555555555", res);
        sql.close()
        callback(res)
    })
}

//insert billtoapp
var BilltoAppModel = new GraphQLObjectType({
    name: 'BilltoAppModel',
    fields: () => ({
        INVOICEID: { type: GraphQLString },
        DocumentSet: { type: GraphQLString },
        CustomerID: { type: GraphQLString },
        CustomerName: { type: GraphQLString },
        AddressShipment: { type: GraphQLString },
        SaleID: { type: GraphQLString },
        Sale_Name: { type: GraphQLString },
        StoreZone: { type: GraphQLString },
        Status:{ type: GraphQLInt },
        MessengerID : { type: GraphQLString },
        MessengerName : { type: GraphQLString },
        Trip : { type: GraphQLInt },
       
    })
})

var modelApptoBill= new GraphQLObjectType({
    name: 'modelApptoBill',
    fields: () => ({
        INVOICEID: { type: GraphQLString },
        MessengerID : { type: GraphQLString },
        Trip : { type: GraphQLInt },
       
    })
})

var insertBilltoApp = {
    type: new GraphQLList(BilltoAppModel),
    args:{ 
        dataBilltoApp:{type:GraphQLList(modelApptoBill)},
    },
    resolve: function (_, args) {
        return new Promise(function (resolve, reject) {
            console.log("ค่า",args)
            fnInsertBilltoApp(args.dataBilltoApp(),function(data){
                resolve(data)
            })
        })
    }
}

var fnInsertBilltoApp = function ( dataBilltoApp,callback) {
    sql.connect(dbConnect.dbConnect).then(pool => {
        // console.log("DB Connected")
        return pool.request()
        da

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
    selectIDMess:selectIDMess,
    selecMess:selecMess,
    selectinvoice:selectinvoice,
}
