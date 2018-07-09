const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const cors = require('cors')
const myGraphQLSchema = require('./schema')

const PORT = 2727;
var app = express();

app.use(cors())
app.use('/api/graphql',
    bodyParser.json(),
    graphqlExpress({ schema: myGraphQLSchema })
);

app.use(cors())
app.use('/api/graphql',
    bodyParser.json(),
    graphqlExpress({ schema: myGraphQLSchema })
);
app.use('/graphiql',
    graphiqlExpress({ endpointURL: '/api/graphql' })
);
app.listen(PORT, () => {
    console.log('ready on http://localhost:' + PORT + '/graphql')
});