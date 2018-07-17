const dbConnect = {
    user: 'trainee2',
    password: 'trai1234',
    server: '192.168.3.21', // You can use 'localhost\\instance' to connect to named instance
    database: 'Data_TransportApp',
    //driver: "msnodesqlv8",
    //connectionString: "Driver={SQL Server Native Client 11.0};Server={NBK-60-084\\SQLEXPRESS2};Database={Data_TransportApp};Trusted_Connection=yes;",
    options: {
        encrypt: true, // Use this if you're on Windows Azure
    }
}
module.exports = {
    dbConnect: dbConnect
}