const graphql = require('graphql');

const taskType = new graphql.GraphQLObjectType({
  name: 'Task',
  fields: {
    id: { type : graphql.GraphQLString },
    title: { type : graphql.GraphQLString },
    body: { type : graphql.GraphQLString },
    complete: { type : graphql.GraphQLBoolean },
  }
})

const userType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString },
  }
});

module.exports = {
  taskType,
  userType,
}
