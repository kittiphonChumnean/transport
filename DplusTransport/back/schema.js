const graphql = require('graphql')
const {
 GraphQLList,
 GraphQLObjectType,
 GraphQLSchema,
 GraphQLString,
 GraphQLInt,
} = graphql

var queryComfrimBill = require ("./query/comfrimBill/comfrimBill.js")
var insertdata_ = require ("./mutation/mutation.js")
var queryGettesk= require("./query/GetTesk/GetTesk")
var queryAssingment = require("./query/Assignment/Assignment")
var queryAssingmentIDmess = require("./query/Assignment/Assignment")
var queryAssingment2 = require("./query/Assignment/Assignment")
var TrackingOrder = require("./query/Tracking/TrackingOrder")
var TrackingMess = require("./query/Tracking/TrackingMess")
var queryAssingmentMess =require("./query/Assignment/Assignment")
var queryAssingmentInvoice =require("./query/Assignment/Assignment")
var QueryAccountReport = require("./query/AccountReport/AccountReport")
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
        selectOrder: TrackingOrder.selectOrder,
        trackingMess: TrackingMess.trackingMess,
        transportReport: TransportReport.transportReport
    }
})

const mutationtype = new GraphQLObjectType({
    name: 'mutation',
    fields: {
        //insertBill: queryComfrimBill.insertBill,
        insertData: insertdata_.insertData,
        queryGettesk: queryGettesk.upDateStateGetTesk,
        queryAssingment:queryAssingment.insertBilltoApp,
        queryAssingment2:queryAssingment2.insertInvoice,
        insertDoc: AssignmentDoc.insertDoc
    }
})

const schema = new GraphQLSchema({
    query: QueryType,
    mutation:mutationtype,
    
})
module.exports = schema