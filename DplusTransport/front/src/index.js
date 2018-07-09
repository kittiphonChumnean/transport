import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import { Router,browserHistory } from 'react-router'
import routes from './routes'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo'
import App from './App';

const networkInterface = createNetworkInterface({
 uri: 'http://localhost:2727/api/graphql'
})
const client = new ApolloClient({
 networkInterface
})

ReactDOM.render(
    <App><ApolloProvider client={client} >
 <Router
 history={browserHistory}
 routes={routes}
 />
 </ApolloProvider></App>,
 document.getElementById('root')
);
registerServiceWorker();