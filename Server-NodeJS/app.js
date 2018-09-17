const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const keys = require('./private/data');
const cors = require('cors');

const app = express();

/****** connect to mlab database ******/
mongoose.connect('mongodb://'+ keys.connectionDB.dbuser + ':' + keys.connectionDB.dbpass + '@ds231529.mlab.com:31529/' + keys.connectionDB.dbname);
mongoose.connection.once('open', () => {
  console.log('connected to database');
});


/****** Middlewares ******/

// Allow cross-orogin requests
app.use(cors());

// GraphQL requests
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));



/****** Start server ******/
app.listen(4000, () => {
  console.log('Now listening for request on port 4000');
});
