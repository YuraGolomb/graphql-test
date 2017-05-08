const graphql = require('graphql');
const { taskType, userType } = require('./types.js');
const { fakeDatabase } = require('./fakeDatabase.js');

const taskQuery = {
  type: taskType,
  args: {
    id: { type: graphql.GraphQLInt }
  },
  resolve: function (_, { id }) {
    return fakeDatabase.tasks.find(( task ) => task.id === id);
  }
}
const allTasksQuery = {
  type: new graphql.GraphQLList(taskType),
  args: {},
  resolve: (_) => {
    return fakeDatabase.tasks;
  }
}

module.exports = {
  taskQuery,
  allTasksQuery,
}
