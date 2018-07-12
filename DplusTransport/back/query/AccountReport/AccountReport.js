var dbConnect = require('../../connectdb/connectdb')
var sql = require('mssql')
var Request = require('tedious').Request;
const graphql = require('graphql')
var moment = require('moment')

const { GraphQLList, GraphQLFloat, GraphQLInt, GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInputObjectType, } = graphql

var selectReportModel = new GraphQLObjectType({
    name: 'selectReportModel',
    fields: () => ({
        INVOICEID: { type: GraphQLString },
        CustomerID : { type: GraphQLString },
        AmountBill : { type: GraphQLInt },
        AmountActual : { type: GraphQLInt }, 
        SaleID : { type: GraphQLString },
    })
})

var selectReport = {
    type: new GraphQLList(selectReportModel),
    args: {
        SaleID: { type: GraphQLString },
        Date :{ type: GraphQLString },
    },
    resolve: function (_, args) {
        return new Promise(function (resolve, reject) {
            console.log("ค่า", args)
            fnselectReport(args.SaleID,args.Date, function (data) {
                resolve(data)
            })
        })
    }
}

var fnselectReport = function (SaleID,Date, callback) {
    sql.connect(dbConnect.dbConnect).then(pool => {
        console.log("DB Connected")
        return pool.request()

            .input('SaleID', sql.VarChar, SaleID)
            .input('Date', sql.VarChar, Date)
            .query(' SELECT	Report.INVOICEID, '+
               ' Report.CustomerID, '+
               ' Report.AmountBill, '+
               ' Report.AmountActual, '+
               ' ConfirmBill.SaleID '+
               ' FROM Report,ConfirmBill '+
         ' WHERE Report.INVOICEID = ConfirmBill.INVOICEID '+
          ' AND ConfirmBill.SaleID = @SaleID '+
         ' AND datediff(day, Datetime, @Date ) = 0 ')

    }).then(res => {
        console.log("555555555555", res);
        sql.close()
        callback(res)
    })
}


module.exports = {
    selectReport:selectReport
}