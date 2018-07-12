var dbConnect = require('../../connectdb/connectdb')
var sql = require('mssql')
var Request = require('tedious').Request;
const graphql = require('graphql')
const { GraphQLList, GraphQLFloat, GraphQLInt, GraphQLObjectType, GraphQLSchema, GraphQLString, } = graphql

var selectTranReport = new GraphQLObjectType({
    name: 'selectTranReport',
    fields: () => ({
        INVOICEID: { type: GraphQLString },
        CustomerID: { type: GraphQLString },
        SaleID: { type: GraphQLString },
        MessengerID: { type: GraphQLString },
        Status: { type: GraphQLString },
        ReasonCN: { type: GraphQLString },
    })
})

var transportReport = {
    type: new GraphQLList(selectTranReport),
    args:{
        SaleID:{type:GraphQLString},
        DateTime:{type:GraphQLString}
    },
    resolve: function (_, args) {
        return new Promise(function (resolve, reject) {
            console.log("ค่า",args)
            fnSelectData(args.SaleID,args.DateTime,function(data){
                resolve(data)
            })
        })
    }
}

var fnSelectData = function (SaleID,DateTime,callback) {
    sql.connect(dbConnect.dbConnect).then(pool => {
        // console.log("DB Connected")
        return pool.request()
        .input('SaleID',sql.VarChar,SaleID)
        .input('DateTime',sql.VarChar,DateTime)
            .query('SELECT Report.INVOICEID, Report.CustomerID, BillToApp.SaleID, BillToApp.MessengerID, Report.Status, Report.ReasonCN FROM BillToApp,Report WHERE BillToApp.INVOICEID = Report.INVOICEID AND BillToApp.SaleID=@SaleID AND datediff(day, Report.Datetime,@Datetime) = 0')
    }).then(res => {
        console.log("555555555555", res);
        sql.close()
        callback(res)
    })
}

module.exports = {
    transportReport: transportReport
}