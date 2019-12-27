const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();

// allow cross-origin requests
app.use(cors());

// connect to mlab db
mongoose.connect("mongodb://admin:test123@ds351628.mlab.com:51628/gql-data");
mongoose.connection.once("open",() => {
	console.log("Connected to MongoDB")
});

app.use("/graphql", graphqlHTTP({
	schema,
	graphiql: true
}));

app.listen(4001,() => {
	console.log('App started. Listening for requests on port 4001...');
});