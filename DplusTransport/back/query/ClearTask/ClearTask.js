var dbConnect = require('../../connectdb/connectdb')
var sql = require('mssql')
var Request = require('tedious').Request;
const graphql = require('graphql')
var moment = require('moment')

const { GraphQLList, GraphQLFloat, GraphQLInt, GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInputObjectType, } = graphql

var selectClearTaskModel = new GraphQLObjectType({
    name: 'selectClearTaskModel',
    fields: () => ({
        Status: { type: GraphQLString },
        ReasonCN : { type: GraphQLString },
        INVOICEID : { type: GraphQLString },
        CustomerName : { type: GraphQLString }, 
        AmountActual : { type: GraphQLInt },
        Datetime :{ type: GraphQLString },
    })
})

var selectClearTask = {
    type: new GraphQLList(selectClearTaskModel),
    args: {
        MessID: { type: GraphQLString },
        Date :{ type: GraphQLString },
    },
    resolve: function (_, args) {
        return new Promise(function (resolve, reject) {
            console.log("ค่า", args)
            fnselectClearTask(args.MessID,args.Date, function (data) {
                resolve(data)
            })
        })
    }
}

var fnselectClearTask = function (MessID,Date, callback) {
    sql.connect(dbConnect.dbConnect).then(pool => {
        console.log("DB Connected")
        return pool.request()

            .input('MessID', sql.VarChar, MessID)
            .input('Date', sql.VarChar, Date)
            .query(
                ' SELECT distinct	Report.INVOICEID, '+
		       ' Report.Status, '+
		      '  Report.ReasonCN, '+
		       ' report.CustomerName, '+
		       ' report.AmountActual, '+
		        ' CONVERT(varchar,BillToApp.datetime,101) as Datetime, '+
		        ' BillToApp.MessengerID '+
            '  FROM Report,BillToApp where Report.INVOICEID=BillToApp.INVOICEID '+
                ' AND Report.Datetime is null '+
                '  AND  datediff(day, BillToApp.datetime, @Date ) = 0 '+
                    '  AND BillToApp.MessengerID= @MessID'
            
            )

    }).then(res => {
        console.log("555555555555", res);
        sql.close()
        callback(res)
    })
}


module.exports = {
    selectClearTask:selectClearTask
}