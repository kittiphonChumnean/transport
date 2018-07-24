var dbConnect = require('../../connectdb/connectdb')
var sql = require('mssql')
var Request = require('tedious').Request;
const graphql = require('graphql')
const { GraphQLList, GraphQLFloat, GraphQLInt,GraphQLInputObjectType, GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLBoolean} = graphql

//select sale
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
            .query('SELECT DISTINCT  SaleID FROM [AX-ToWebTest2] Order by SaleID ASC')
    }).then(res => {
        sql.close()
        callback(res)

    })

    sql.on('error', err => {
        // ... error handler
        callback(err)
    })
}

//select bill
var allBill = new GraphQLObjectType({
    name: 'allBill',
    fields: () => ({
        INVOICEID: { type: GraphQLString },
        DELIVERYNAME: { type: GraphQLString },
        Customer_Address: { type: GraphQLString },
        StoreZone: { type: GraphQLString },
        CustomerID: { type: GraphQLString },
        CustomerName: { type: GraphQLString },
        SaleID: { type: GraphQLString },
        Sale_Name: { type: GraphQLString },
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
            .query('SELECT DISTINCT INVOICEID,DELIVERYNAME,Customer_Address,SaleID,Sale_Name,StoreZone,CustomerID,CustomerName FROM [AX-ToWebTest2] WHERE SaleID=@SaleID AND invoicedate= @invoicedate AND Stutas IS NULL')
    }).then(res => {
        console.log("555555555555", res);
        sql.close()
        callback(res)
    })
}

//insert Allbill
var ConfrimModel = new GraphQLInputObjectType({
    name: 'ConfrimModel',
    fields: () => ({
        INVOICEID: { type: GraphQLString }
    })
})

var inputStatusAllbill = new GraphQLObjectType({
    name: 'inputStatusAllbill', 
    fields: () => ({
        status: {type: GraphQLBoolean}
    })
})

var insertBill={
    type:inputStatusAllbill,
    args: {
        inData: {
            type: new GraphQLList(ConfrimModel),
            args: {
                INVOICEID: { type: GraphQLString }
            }
        },
        DocumentSet: { type: GraphQLString }
    },
    resolve: function (_, args) {
        return new Promise(function (resolve, reject){
            console.log("ค่า",args.inData)
            fninsertBill(args.inData,args.DocumentSet, function (data) {
                resolve(data)
            })
        })
    }
}

var fninsertBill = function (inData,DocumentSet, callback) {
    sql.close();
    sql.connect(dbConnect.dbConnect).then(pool => {
        var request = new sql.Request(pool)
        var strVal = ""
        inData.forEach(function (val, i) {
            request.input('INVOICEID' + i, sql.VarChar, val.INVOICEID)
            if (i + 1 == inData.length) {
                strVal += "(@INVOICEID" + i +")"
            } else {
                strVal += "(@INVOICEID" + i +"),"
            }
        });
        request.input('DocumentSet' ,sql.VarChar, DocumentSet)
        //console.log('str',strVal)
        request.query('insert into [ConfirmBill] ([INVOICEID]) values '+ strVal  + 
                        
                            ' UPDATE '+
                            ' ConfirmBill '+
                        ' SET '+
                            ' DocumentSet= @DocumentSet, '+
                        ' CustomerID= [AX-ToWebTest2].CustomerID, '+
                            ' CustomerName = [AX-ToWebTest2].CustomerName, '+
                            ' AddressShipment = [AX-ToWebTest2].Customer_Address, '+
                        ' SaleID= [AX-ToWebTest2].SaleID, '+
                            ' Sale_Name = [AX-ToWebTest2].Sale_Name, '+
                            ' StoreZone=[AX-ToWebTest2].StoreZone ,'+
                            ' Status=1 , '+
                            ' DELIVERYNAME=[AX-ToWebTest2].DELIVERYNAME '+
                        ' FROM '+
                            ' ConfirmBill '+
                        ' INNER JOIN '+
                            ' [AX-ToWebTest2] '+
                        ' ON '+
                            ' ConfirmBill.INVOICEID = [AX-ToWebTest2].INVOICEID '+
                        ' WHERE '+
                            ' ConfirmBill.CustomerID IS NULL '+  
                        
                        ' UPDATE [AX-ToWebTest2] SET [Stutas] = 1 WHERE [INVOICEID] IN ('+ strVal+') '+
                        
                        ' INSERT INTO [dbo].[ConfirmBillDetail] ([INVOICEID] ,[ItemID] ,[ItemName] ,[Qty] , '+
                        ' [Amount],[PriceOfUnit]) SELECT [INVOICEID],ITEMID,ItemName,QTY,TotalAmount,(TotalAmount/QTY) '+         
                        ' from [AX-ToWebTest2] where [AX-ToWebTest2].[INVOICEID] IN ('+ strVal+') ')
            .then(res => {
                // console.log(q.sql)
                sql.close();              
                    callback({ status: true })              
            })
    })
}

//ดูDetail invoice
var DetailModal = new GraphQLObjectType({
    name: 'DetailModal',
    fields: () => ({
        INVOICEID: { type: GraphQLString },
        ITEMID: { type: GraphQLString },
        ItemName: { type: GraphQLString },
        QTY: { type: GraphQLString },
        TotalAmount: { type: GraphQLString }
    })
})

var selectDetailBill = {
    type: new GraphQLList(DetailModal),
    args:{
        INVOICEID: { type: GraphQLString },
    },
    resolve: function (_, args) {
        return new Promise(function (resolve, reject) {
            console.log("ค่า",args)
            fnselectDetailBill(args.INVOICEID,function(data){
                resolve(data)
            })
        })
    }
}

var fnselectDetailBill = function (INVOICEID,callback) {
    sql.connect(dbConnect.dbConnect).then(pool => {
        // console.log("DB Connected")
        return pool.request()
        .input('INVOICEID',sql.VarChar,INVOICEID)
            .query('SELECT INVOICEID ,ITEMID ,ItemName ,QTY ,TotalAmount FROM [AX-ToWebTest2] WHERE INVOICEID = @INVOICEID')
    }).then(res => {
        console.log("Detail", res);
        sql.close()
        callback(res)
    })
}

//creatDocumentSet
var model = new GraphQLObjectType({
    name: 'model',
    fields: () => ({
        last: { type: GraphQLInt }
    })
})

var DocumentSet = {
    type: new GraphQLList(model),
    resolve: function (_, args) {
        return new Promise(function (resolve, reject) {
            fnData(function (data) {
                resolve(data)
            })
        })
    }
}

var fnData = function (callback) {
    sql.connect(dbConnect.dbConnect).then(pool => {
        // console.log("DB Connected")
        return pool.request()
            .query('SELECT last FROM LastDocomentSet '+
                   ' UPDATE LastDocomentSet SET last = last+1 ')
    }).then(res => {
        sql.close()
        console.log('res',res)
        callback(res)

    })

    sql.on('error', err => {
        // ... error handler
        callback(err)
    })
}



module.exports = {
    selectSale: selectSale,
    selectAllBill: selectAllBill,
    insertBill: insertBill,
    selectDetailBill: selectDetailBill,
    DocumentSet: DocumentSet
}