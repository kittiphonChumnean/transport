const graphql = require('graphql')
const {
 GraphQLList,
 GraphQLObjectType,
 GraphQLSchema,
 GraphQLString,
 GraphQLInt,
} = graphql

var queryComfrimBill = require ("./query/comfrimBill/comfrimBill.js")//j
var insertdata_ = require ("./mutation/mutation.js")
var queryGettesk= require("./query/GetTesk/GetTesk")//n
var queryAssingment = require("./query/Assignment/Assignment")
var queryAssingmentIDmess = require("./query/Assignment/Assignment")
var queryAssingment2 = require("./query/Assignment/Assignment")
var TrackingOrder = require("./query/Tracking/TrackingOrder")
var TrackingMess = require("./query/Tracking/TrackingMess")
var queryAssingmentMess =require("./query/Assignment/Assignment")
var queryAssingmentInvoice =require("./query/Assignment/Assignment")
var QueryAccountReport = require("./query/AccountReport/AccountReport")
var QueryCNReport = require("./query/CNReport/CNReport")
var QueryClearTask =require("./query/ClearTask/ClearTask")

//nan import












//jar import
var AssignmentDoc = require("./query/AssignmentDoc/AssignmentDoc")
var TransportReport = require("./query/TransportReport/TransportReport")








const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {

        selectSale: queryComfrimBill.selectSale,
        selectAllBill: queryComfrimBill.selectAllBill,
        queryGettesk : queryGettesk.selectGetTesk,
        queryAssingmentIDmess : queryAssingmentIDmess.selectIDMess,
        queryAssingment : queryAssingment.selecMess,
        queryAssingment : queryAssingment.selectinvoice,
        queryAssingmentMess : queryAssingmentMess.selecMess,
        queryAssingmentInvoice:queryAssingmentInvoice.selectinvoice,
        QueryAccountReport:QueryAccountReport.selectReport,
        QueryCNReport:QueryCNReport.selectReportCN,
        QueryClearTask:QueryClearTask.selectClearTask,


        //nan query













        //jar query 
        selectOrder: TrackingOrder.selectOrder,
        trackingMess: TrackingMess.trackingMess,
        transportReport: TransportReport.transportReport,
        trackingStatusMess: TrackingMess.trackingStatusMess,
        selectDetailBill: queryComfrimBill.selectDetailBill



   
    }
})

const mutationtype = new GraphQLObjectType({
    name: 'mutation',
    fields: {

        insertBill: queryComfrimBill.insertBill,

        
        insertData: insertdata_.insertData,
        queryGettesk: queryGettesk.upDateStateGetTesk,
        queryAssingment:queryAssingment.insertBilltoApp,
        queryAssingment2:queryAssingment2.insertInvoice,

        //nan muta













        //jar muta
        insertDoc: AssignmentDoc.insertDoc,
        updateAX: queryComfrimBill.updateAX,
        insertInvoice: queryComfrimBill.insertInvoice,
        insert1InvoiceToComfrimBill: queryComfrimBill.insert1InvoiceToComfrimBill      

    }
})

const schema = new GraphQLSchema({
    query: QueryType,
    mutation:mutationtype,
    
})
module.exports = schema