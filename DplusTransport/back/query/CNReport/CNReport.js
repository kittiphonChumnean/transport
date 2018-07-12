var dbConnect = require('../../connectdb/connectdb')
var sql = require('mssql')
var Request = require('tedious').Request;
const graphql = require('graphql')
var moment = require('moment')

const { GraphQLList, GraphQLFloat, GraphQLInt, GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInputObjectType, } = graphql

var selectReportCNModel = new GraphQLObjectType({
    name: 'selectReportCN',
    fields: () => ({
        SaleID : { type: GraphQLString },
        INVOICEID :{ type: GraphQLString },
        CustomerID :{ type: GraphQLString },
        QtyBill : { type: GraphQLInt },
        QtyActual : { type: GraphQLInt },
        AmountBill : { type: GraphQLInt },
        AmountActual : { type: GraphQLInt },
        Datetime :{ type: GraphQLString },
        ReasonCN : { type: GraphQLString },
    })
})

var selectReportCN = {
    type: new GraphQLList(selectReportCNModel),
    args: {
        SaleID: { type: GraphQLString },
        DateStart :{ type: GraphQLString },
        DateEnd :{ type: GraphQLString },
       
    },
    resolve: function (_, args) {
        return new Promise(function (resolve, reject) {
            console.log("ค่า", args)
            var DateStart_ = args.DateStart+" 23:59:59.999"
            var DateEnd_=args.DateEnd+" 23:59:59.999"
            console.log(DateStart_,DateEnd_)
            fnselectReport(args.SaleID,DateStart_,DateEnd_, function (data) {
                resolve(data)
            })
        })
    }
}

var fnselectReport = function (SaleID,DateStart,DateEnd, callback) {
    sql.connect(dbConnect.dbConnect).then(pool => {
        console.log("DB Connected")
        return pool.request()

            .input('SaleID', sql.VarChar, SaleID)
            .input('DateStart', sql.VarChar, DateStart )
            .input('DateEnd', sql.VarChar, DateEnd )
            .query(
               ' SELECT	distinct ConfirmBill.SaleID, '+
               ' report.INVOICEID, '+
               ' Report.CustomerID, '+
               ' (SELECT sum(ReportDetail.QtyBill)  FROM ReportDetail where ReportDetail.INVOICEID=ConfirmBill.INVOICEID) AS QtyBill, '+
               ' (SELECT sum(ReportDetail.QtyActual)  FROM ReportDetail where ReportDetail.INVOICEID=ConfirmBill.INVOICEID) AS QtyActual, '+
               ' Report.AmountBill, '+
               ' Report.AmountActual, '+
               ' CONVERT(varchar,Report.Datetime,101) as Datetime, '+
               ' Report.ReasonCN '+
         ' FROM Report,ConfirmBill,ReportDetail '+
         ' WHERE Report.INVOICEID = ConfirmBill.INVOICEID and ConfirmBill.INVOICEID =ReportDetail.INVOICEID '+
         '  AND ConfirmBill.SaleID = @SaleID ' +
         ' AND  Report.Datetime between @DateStart and @DateEnd '
            )

    }).then(res => {
        console.log("555555555555", res);
        console.log(DateStart);
        sql.close()
        callback(res)
    })
}


module.exports = {
    selectReportCN:selectReportCN
}