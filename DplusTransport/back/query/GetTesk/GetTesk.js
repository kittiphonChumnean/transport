var dbConnect = require('../../connectdb/connectdb')
var sql = require('mssql')
var Request = require('tedious').Request;
const graphql = require('graphql')
const { GraphQLList, GraphQLFloat, GraphQLInt, GraphQLObjectType, GraphQLSchema, GraphQLString,GraphQLInputObjectType } = graphql
const dateformat = require('dateformat');

var selectDocomentModel = new GraphQLObjectType({
    name: 'DocomentModel',
    fields: () => ({
        DocumentSet: { type: GraphQLString },
    })
})

var selectDocoment = {
    type: new GraphQLList(selectDocomentModel),
    resolve: function (_, args) {
        return new Promise(function (resolve, reject) {
            console.log("ค่า", args)
            fnselectDocoment(function (data) {
                resolve(data)
            })
        })
    }
}

var fnselectDocoment = function (callback) {
    sql.connect(dbConnect.dbConnect).then(pool => {
        // console.log("DB Connected")
        return pool.request()

            .query('SELECT DISTINCT [DocumentSet]  FROM [ConfirmBill]')
    }).then(res => {
        console.log("555555555555", res);
        sql.close()
        callback(res)
    })
}



var GetTeskModel = new GraphQLObjectType({
    name: 'GetTeskModel',
    fields: () => ({
        INVOICEID: { type: GraphQLString },
        QTYbox: { type: GraphQLInt },
        CustomerName: { type: GraphQLString },
        Status:{type:GraphQLInt},
        SaleID:{ type: GraphQLString }
    })
})

var selectGetTesk = {
    type: new GraphQLList(GetTeskModel),
    args:{
        DocumentSet:{type:GraphQLString},
    },
    resolve: function (_, args) {
        return new Promise(function (resolve, reject) {
            console.log("ค่า",args)
            fnSelectGetTesk(args.DocumentSet,function(data){
                resolve(data)
            })
        })
    }
}

var fnSelectGetTesk = function (DocumentSet,callback) {
    sql.connect(dbConnect.dbConnect).then(pool => {
        // console.log("DB Connected")
        return pool.request()
        .input('DocumentSet',sql.VarChar,DocumentSet)
            .query(' SELECT  [INVOICEID],[CustomerName],[QTYbox],Status,SaleID FROM [ConfirmBill] WHERE DocumentSet=@DocumentSet ')
    }).then(res => {
        console.log("555555555555", res);
        sql.close()
        callback(res)
    })
}


var upDateStateGetTeskModel = new GraphQLInputObjectType({
    name: 'upDateStateGetTeskModel',
    fields: () => ({
        INVOICEID: { type: GraphQLString },
    })
})
var inputStatusType_ = new GraphQLObjectType({
    name: 'inputStatusType_',
    fields: () => ({
        status: { type: GraphQLString }
    })
})

var upDateStateGetTesk = {
    type: inputStatusType_,
    args: {
        inData: {
            type: new GraphQLList(upDateStateGetTeskModel),
            args: {
                INVOICEID: { type: GraphQLString },
            }
        }
    },
    resolve: function (_, args) {
        return new Promise(function (resolve, reject) {
            fnUpDateStateGetTesk( args.inData,function ( data) {
                resolve(data)
            })
        })
    }
}


var fnUpDateStateGetTesk = function ( inData,callback) {
    var now = new Date(); 
    var date_t = dateformat(now, 'yyyy-mm-dd HH:MM:ss');
    sql.close();
    sql.connect(dbConnect.dbConnect).then(pool => {
        var request = new sql.Request(pool)
        var strVal = ""
        var strVal2 = ""
        inData.forEach(function (val, i) {
            console.log("val", val);
            request.input('inINVOICEID' + i, sql.VarChar, val.INVOICEID)
            if (i + 1 == inData.length) {
                strVal += "(@inINVOICEID" + i + ")"
            } else {
                strVal += "(@inINVOICEID" + i +  "),"
            }

            request.input('DateTime' + i, sql.VarChar, date_t)
            request.input('Status' + i, sql.VarChar, "3")
            if (i + 1 == inData.length) {
                strVal2 += "(@inINVOICEID" + i + ",@DateTime" + i + ",@Status" + i + ")"
            } else {
                strVal2 += "(@inINVOICEID" + i + ",@DateTime" + i + ",@Status" + i + "),"
            }
        });
        request.query('UPDATE [dbo].[ConfirmBill] SET  [Status] = 2 WHERE INVOICEID IN ('+strVal+') '+
    
                'INSERT INTO [Tracking] ([invoice] ,[DateTime] ,[status] ) VALUES ' + strVal2 )
            .then(res => {
                // console.log("test", res);
                sql.close();
                
                    callback({ status: "2" })
                
            })
    })
}


module.exports = {
    selectGetTesk:selectGetTesk,
    upDateStateGetTesk:upDateStateGetTesk,
    fnUpDateStateGetTesk:fnUpDateStateGetTesk,
    selectDocoment,selectDocoment
    
}