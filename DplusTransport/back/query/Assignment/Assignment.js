var dbConnect = require('../../connectdb/connectdb')
var sql = require('mssql')
var Request = require('tedious').Request;
const graphql = require('graphql')
var moment = require('moment')

const { GraphQLList, GraphQLFloat, GraphQLInt, GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInputObjectType, } = graphql

//-----------selectIDMess--------------//
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
            console.log("ค่า", args)
            fnselectIDMess(function (data) {
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

//----------Search  meses--------------//
var Messmodel = new GraphQLObjectType({
    name: 'Messmodel',
    fields: () => ({
        Zone: { type: GraphQLString },
    })
})

var selecMess = {
    type: new GraphQLList(Messmodel),
    args: {
        IDMess: { type: GraphQLString },
    },
    resolve: function (_, args) {
        return new Promise(function (resolve, reject) {
            console.log("ค่า", args)
            fnSelecMess(args.IDMess, function (data) {
                resolve(data)
            })
        })
    }
}


var fnSelecMess = function (IDMess, callback) {
    sql.connect(dbConnect.dbConnect).then(pool => {
        console.log("DB Connected")
        return pool.request()
            .input('IDMess', sql.VarChar, IDMess)
            .query('SELECT [Zone] FROM [Messenger] WHERE IDMess = @IDMess')
    }).then(res => {
        console.log("555555555555", res);
        sql.close()
        callback(res)
    })
}


//------------Search  DataInvoice-------------//
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
        DELIVERYNAME :{ type: GraphQLString },

    })
})

var selectinvoice = {
    type: new GraphQLList(invoiceModel),
    args: {
        INVOICEID: { type: GraphQLString },
    },
    resolve: function (_, args) {
        return new Promise(function (resolve, reject) {
            console.log("ค่า", args)
            fnSelectinvoice(args.INVOICEID, function (data) {
                resolve(data)
            })
        })
    }
}

var fnSelectinvoice = function (INVOICEID, callback) {
    sql.connect(dbConnect.dbConnect).then(pool => {
        // console.log("DB Connected")
        return pool.request()
            .input('INVOICEID', sql.VarChar, INVOICEID)
            .query('SELECT [INVOICEID],[DocumentSet],[CustomerID],[CustomerName],[AddressShipment],[SaleID],[Sale_Name],[StoreZone],[DELIVERYNAME]FROM [ConfirmBill] WHERE Status=2 AND INVOICEID = @INVOICEID')
    }).then(res => {
        console.log("555555555555", res);
        sql.close()
        callback(res)
    })
}

//insert billtoapp
var BilltoAppModel = new GraphQLInputObjectType({
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
        Status: { type: GraphQLInt },
        MessengerID: { type: GraphQLString },
        MessengerName: { type: GraphQLString },
        Trip: { type: GraphQLInt },
    })
})

var inputStatusType = new GraphQLObjectType({
    name: 'inputStatusType',
    fields: () => ({
        status: { type: GraphQLString }
    })
})

var insertBilltoApp = {
    type: inputStatusType,
    args: {
        inData: {
            type: new GraphQLList(BilltoAppModel),
            args: {
                INVOICEID: { type: GraphQLString },
                MessengerID: { type: GraphQLString },
                Trip: { type: GraphQLInt },
            }
        }
    },
    resolve: function (_, args) {
        return new Promise(function (resolve, reject) {
            console.log("ค่า", args)
            fninsertBilltoApp(args.inData, function (data) {
                resolve(data)
            })

        })
    }
}

var fninsertBilltoApp = function (inData, callback) {
    sql.close();
    sql.connect(dbConnect.dbConnect).then(pool => {
        var request = new sql.Request(pool)
        var strVal = ""
        inData.forEach(function (val, i) {
            console.log("val", val);
            request.input('inINVOICEID' + i, sql.VarChar, val.INVOICEID)
            request.input('inMessengerID' + i, sql.VarChar, val.MessengerID)
            request.input('inTrip' + i, sql.Int, val.Trip)

            if (i + 1 == inData.length) {
                strVal += "(@inINVOICEID" + i + ",@inMessengerID" + i + ",@inTrip" + i + ")"
            } else {
                strVal += "(@inINVOICEID" + i + ",@inMessengerID" + i + ",@inTrip" + i + "),"
            }
        });

        request.query("INSERT INTO [BillToApp] ([INVOICEID],[MessengerID],[Trip]) VALUES" +
            strVal)
            .then(res => {
                // console.log("test", res);
                sql.close();
                
                    callback({ status: "2" })
                
            })
    })
}

//update table billtomess from invoiec
var insertInvoiceModel = new GraphQLObjectType({
    name: 'insertInvoiceModel',
    fields: () => ({
        INVOICEID: { type: GraphQLString },
        DocumentSet: { type: GraphQLString },
        CustomerID: { type: GraphQLString },
        CustomerName: { type: GraphQLString },
        AddressShipment: { type: GraphQLString },
        SaleID: { type: GraphQLString },
        Sale_Name: { type: GraphQLString },
        StoreZone: { type: GraphQLString },
        Status: { type: GraphQLInt },
        
    })
})

var insertInvoice = {
    type: new GraphQLList(insertInvoiceModel),
    resolve: function (_, args) {
        return new Promise(function (resolve, reject) {
            console.log("ค่า", args)
            fninsertInvoice(function (data) {
                resolve(data)
            })
        })
    }
}

var fninsertInvoice = function (callback) {
    sql.connect(dbConnect.dbConnect).then(pool => {
        console.log("DB Connected")
        return pool.request()

            .query(
                'UPDATE '+
                    ' BillToApp '+
                ' SET '+
                    ' DocumentSet= ConfirmBill.DocumentSet, '+
                   ' CustomerID= ConfirmBill.CustomerID, '+
                    ' CustomerName = ConfirmBill.CustomerName, '+
                    ' AddressShipment = ConfirmBill.AddressShipment, '+
                   ' SaleID= ConfirmBill.SaleID, '+
                    ' Sale_Name = ConfirmBill.Sale_Name, '+
                    ' StoreZone=ConfirmBill.StoreZone ,'+
                    ' Status=3 , '+
                    ' DELIVERYNAME=ConfirmBill.DELIVERYNAME, '+
                    ' datetime = GETDATE ( ) '+
                ' FROM '+
                    ' BillToApp '+
                ' INNER JOIN '+
                    ' ConfirmBill '+
                ' ON '+
                    ' BillToApp.INVOICEID = ConfirmBill.INVOICEID'
            )
    }).then(res => {
        console.log("555555555555", res);
        sql.close()
        callback(res)
    })
}



module.exports = {
    selectIDMess: selectIDMess,
    selecMess: selecMess,
    selectinvoice: selectinvoice,
    insertBilltoApp: insertBilltoApp,
    fninsertBilltoApp: fninsertBilltoApp,
    insertInvoice:insertInvoice,
   

}