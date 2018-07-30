var dbConnect = require('../../connectdb/connectdb')
var sql = require('mssql')
var Request = require('tedious').Request;
const graphql = require('graphql')
const { GraphQLList, GraphQLFloat, GraphQLInt, GraphQLObjectType, GraphQLSchema, GraphQLString,GraphQLInputObjectType } = graphql

var GetTeskModel = new GraphQLObjectType({
    name: 'GetTeskModel',
    fields: () => ({
        INVOICEID: { type: GraphQLString },
        QTYbox: { type: GraphQLInt },
        CustomerName: { type: GraphQLString },
        Status:{type:GraphQLInt}
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
            .query(' SELECT  [INVOICEID],[CustomerName],[QTYbox],Status FROM [ConfirmBill] WHERE DocumentSet=@DocumentSet ')
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
    sql.close();
    sql.connect(dbConnect.dbConnect).then(pool => {
        var request = new sql.Request(pool)
        var strVal = ""
        inData.forEach(function (val, i) {
            console.log("val", val);
            request.input('inINVOICEID' + i, sql.VarChar, val.INVOICEID)
            if (i + 1 == inData.length) {
                strVal += "(@inINVOICEID" + i + ")"
            } else {
                strVal += "(@inINVOICEID" + i +  "),"
            }
        });
        request.query("UPDATE [dbo].[ConfirmBill] SET  [Status] = 2 WHERE INVOICEID IN ("+strVal+") " )
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
    fnUpDateStateGetTesk:fnUpDateStateGetTesk
    
}