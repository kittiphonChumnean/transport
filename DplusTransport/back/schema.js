const graphql = require('graphql')
const {
 GraphQLList,
 GraphQLObjectType,
 GraphQLSchema,
 GraphQLString,
} = graphql

var queryComfrimBill = require ("./query/comfrimBill/comfrimBill.js")
var insertdata_ = require ("./mutation/mutation.js")

const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        selectSale: queryComfrimBill.selectSale,
        selectAllBill: queryComfrimBill.selectAllBill
    }
})

const mutationtype = new GraphQLObjectType({
    name: 'mutation',
    fields: {
        
        insertData: insertdata_.insertData,
    }
})

const schema = new GraphQLSchema({
    query: QueryType,
    mutation:mutationtype
})
module.exports = schema