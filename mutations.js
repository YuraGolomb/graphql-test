const graphql = require('graphql');
const { taskType, userType } = require('./types.js');
const { fakeDatabase } = require('./fakeDatabase.js');

const createTaskMutation = {
     type: taskType,
     args: {
       title: {
         type: graphql.GraphQLString
       },
       body: {
         type: graphql.GraphQLString
       }
     },
     resolve: (_, {title, body}) => {
       const id = require('crypto').randomBytes(10).toString('hex');
       const task = new Task(id, title, body)
       fakeDatabase.tasks.push(task)
       return task;
   }
}

const completeTaskMutation = {
  type: taskType,
  args: {
    id: {
      type: graphql.GraphQLString
    },
    complete: {
      type: graphql.GraphQLBoolean
    }
  },
  resolve: (_ ,{ id, complete }) => {
    const storedTaskIndex = fakeDatabase.tasks.findIndex((storedTask) => storedTask.id === id);
    fakeDatabase.tasks[storedTaskIndex].complete = complete;

    return fakeDatabase.tasks[storedTaskIndex];
  }
}

const updateTaskMutation = {
  type: taskType,
  args: {
    id: {
      type: graphql.GraphQLString
    },
    title: {
      type: graphql.GraphQLString
    },
    body: {
      type: graphql.GraphQLString
    },
    complete: {
      type: graphql.GraphQLBoolean
    }
  },
  resolve: (_, { id, title, body, complete }) => {
    const storedTaskIndex = fakeDatabase.tasks.findIndex((storedTask) => storedTask.id === id);
    fakeDatabase.tasks[storedTaskIndex] = {
      id,
      title,
      body,
      complete,
    };
    return fakeDatabase.tasks[storedTaskIndex];
  }
}

class Task {
  constructor(id, title, body) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.complete = false;
  }
}

module.exports = {
  createTaskMutation,
  updateTaskMutation,
  completeTaskMutation,
}
