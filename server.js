const express = require('express');
const graphql = require('graphql');
const graphqlHTTP = require('express-graphql');

const { taskQuery, allTasksQuery } = require('./queries');
const { fakeDatabase } = require('./fakeDatabase.js');
const { taskType, userType } = require('./types.js');
const { createTaskMutation, updateTaskMutation, completeTaskMutation } = require('./mutations.js');

const mutationType = new graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createTask: createTaskMutation,
    updateTask: updateTaskMutation,
    completeTask: completeTaskMutation,
  }
})

const queryType = new graphql.GraphQLObjectType({
  name: 'Query',
  fields: {
    task: taskQuery,
    tasks: allTasksQuery,
  }
});

const schema = new graphql.GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
