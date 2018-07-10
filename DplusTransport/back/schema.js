const graphql = require('graphql')
const {
 GraphQLList,
 GraphQLObjectType,
 GraphQLSchema,
 GraphQLString,
} = graphql

var queryComfrimBill = require ("./query/comfrimBill/comfrimBill.js")
var insertdata_ = require ("./mutation/mutation.js")
var queryGettesk= require("./query/GetTesk/GetTesk")
var queryAssingment = require("./query/Assignment/Assignment")
var trackingOrder = require("./query/Tracking/TrackingOrder")
var TrackingMess = require("./query/Tracking/TrackingMess")

const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        selectSale: queryComfrimBill.selectSale,
        selectAllBill: queryComfrimBill.selectAllBill,
        queryGettesk : queryGettesk.selectGetTesk,
        queryAssingment : queryAssingment.selectIDMess,
        queryAssingment : queryAssingment.selecMess,
        queryAssingment : queryAssingment.selectinvoice,
        selectOrder : trackingOrder.selectOrder,
        selectMess : TrackingMess.selectMess    
    }
})

const mutationtype = new GraphQLObjectType({
    name: 'mutation',
    fields: {
        //insertBill: queryComfrimBill.insertBill,
        insertData: insertdata_.insertData,
        queryGettesk: queryGettesk.upDateStateGetTesk
       

    }
})

const schema = new GraphQLSchema({
    query: QueryType,
    mutation:mutationtype
})
module.exports = schema