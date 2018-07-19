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
            .query('SELECT DISTINCT  SaleID FROM [AX-ToWebTest2]')
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
   var inputBill = new GraphQLInputObjectType({
       name: 'inputBillData',
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

  var inputStatusType = new GraphQLObjectType({
      name: 'inputStatusType2',
      fields: () => ({
          status: { type: GraphQLBoolean }
      })
  })

  var insertBill = {
      type: inputStatusType,//new GraphQLList(inputStatusType),
      args: {
          inData: {
              type: new GraphQLList(inputBill),
              args: {
                    INVOICEID: { type: GraphQLString },
                    DELIVERYNAME: { type: GraphQLString },
                    Customer_Address: { type: GraphQLString },
                    StoreZone: { type: GraphQLString },
                    CustomerID: { type: GraphQLString },
                    CustomerName: { type: GraphQLString },
                    SaleID: { type: GraphQLString },
                    Sale_Name: { type: GraphQLString },
              }
          }
      },
      resolve: function (_, args) {
          return new Promise(function (resolve, reject) {
              // resolve({ status: "1" })
              console.log("ค่า", args)
              fnInsertData(args.inData, function (data) {
                  resolve(data)
              })
          })
      }
  }
  var fnInsertData = function (inData, callback) {
      sql.close();
      sql.connect(dbConnect.dbConnect).then(pool => {
           console.log("DB Connected",inData, inData.item)
          var request = new sql.Request(pool)
          var strVal=""
          inData.forEach(function (val, i) {
              // console.log("val", val);
              request.input('inINVOICEID'+i, sql.VarChar, val.INVOICEID)
              request.input('inDELIVERYNAME'+i, sql.VarChar, val.DELIVERYNAME)
              request.input('inCustomer_Address'+i, sql.VarChar, val.Customer_Address)
              request.input('inStoreZone'+i, sql.VarChar, val.StoreZone)
              request.input('inCustomerID'+i, sql.VarChar, val.CustomerID)
              request.input('inCustomerName'+i, sql.VarChar, val.CustomerName)
              request.input('inSaleID'+i, sql.VarChar, val.SaleID)
              request.input('inSale_Name'+i, sql.VarChar, val.Sale_Name)
              request.input('inStatus'+i, sql.Int, 1)
              if(i+1==inData.length){
                  strVal+="(@inINVOICEID"+i+",@inDELIVERYNAME"+i+",@inCustomer_Address"+i+",@inStoreZone"+i+",@inCustomerID"+i+",@inCustomerName"+i+",@inSaleID"+i+",@inSale_Name"+i+",@inStatus"+i+")"
              }else{
                  strVal+="(@inINVOICEID"+i+",@inDELIVERYNAME"+i+",@inCustomer_Address"+i+",@inStoreZone"+i+",@inCustomerID"+i+",@inCustomerName"+i+",@inSaleID"+i+",@inSale_Name"+i+",@inStatus"+i+"),"
              }
          });
          request.query("INSERT INTO [dbo].[ConfirmBill]" +
              "([INVOICEID],[DELIVERYNAME],[AddressShipment],[StoreZone],[CustomerID],[CustomerName],[SaleID],[Sale_Name],[Status])" +
              "VALUES" +
              strVal).then(res => {
                  //console.log("test", res);
                  sql.close();
                  
                      callback({status:true})
                  
              })
      })
  }

  //updateAX
  var updateAX = {
    type: inputStatusType,//new GraphQLList(inputStatusType),
    args: {
        inData: {
            type: new GraphQLList(inputBill),
            args: {
                  INVOICEID: { type: GraphQLString }
            }
        }
    },
    resolve: function (_, args) {
        return new Promise(function (resolve, reject) {
            // resolve({ status: "1" })
            console.log("ค่า", args)
            fnInsertData2(args.inData, function (data) {
                resolve(data)
            })
        })
    }
}
var fnInsertData2 = function (inData, callback) {
    sql.close();
    sql.connect(dbConnect.dbConnect).then(pool => {
         console.log("DB Connected",inData, inData.item)
        var request = new sql.Request(pool)
        var strVal=""
        inData.forEach(function (val, i) {
            // console.log("val", val);
            request.input('inINVOICEID'+i, sql.VarChar, val.INVOICEID)
            if(i+1==inData.length){
                strVal+="(@inINVOICEID"+i+")"
            }else{
                strVal+="(@inINVOICEID"+i+"),"
            }
        });
        request.query("UPDATE [dbo].[AX-ToWebTest2] SET [Stutas] = 1 WHERE [INVOICEID] = " 
            + strVal).then(res => {
                //console.log("test", res);
                sql.close();
                
                    callback({status:true})
                
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

//insertInvoice
var insertInvoiceStatus = new GraphQLObjectType({
    name: 'insertInvoiceStatus', 
    fields: () => ({
        status: {type: GraphQLBoolean}
    })
})

var insertInvoice={
    type:insertInvoiceStatus,
    args:{
        INVOICEID: {type: GraphQLString}
    },
    resolve: function (_, args) {
        return new Promise(function (resolve, reject){
            console.log("ค่า",args)
            fninsertINVOICEID(args.INVOICEID, function (data) {
                resolve(data)
            })
        })
    }
}

var fninsertINVOICEID = function (INVOICEID, callback) {
    sql.close();
    sql.connect(dbConnect.dbConnect).then(pool => {
        var request = new sql.Request(pool)
        request.input('INVOICEID',sql.VarChar,INVOICEID)
        request.query("insert into [ConfirmBill] ([INVOICEID]) values (@INVOICEID)")
            .then(res => {
                sql.close();              
                    callback({ status: true })              
            })
    })
}

//insert1InvoiceToConfirmBill
var insertInvoiceStatus2 = new GraphQLObjectType({
    name: 'insertInvoiceStatus2', 
    fields: () => ({
        status: {type: GraphQLBoolean}
    })
})

var insert1InvoiceToComfrimBill={
    type: new GraphQLList(insertInvoiceStatus2),
    resolve: function (_, args) {
        return new Promise(function (resolve, reject){
            fninsertINVOICEID2(function (data) {
                resolve(data)
            })
        })
    }
}

var fninsertINVOICEID2 = function (callback) {
    sql.close();
    sql.connect(dbConnect.dbConnect).then(pool => {
        return pool.request()
            .query(
                'UPDATE '+
                    ' ConfirmBill '+
                ' SET '+
                    ' DocumentSet= 1111, '+
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
                    ' ConfirmBill.CustomerID IS NULL '
            )
    }).then(res => {
        console.log("555555555555", res);
        sql.close()
        callback({ status: true })  
    })
}



module.exports = {
    selectSale: selectSale,
    selectAllBill: selectAllBill,
    insertBill: insertBill,
    updateAX: updateAX,
    selectDetailBill: selectDetailBill,
    insertInvoice: insertInvoice,
    insert1InvoiceToComfrimBill: insert1InvoiceToComfrimBill
}