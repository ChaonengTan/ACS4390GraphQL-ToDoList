// dependancies
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

const Data = require('./data.json')

// schemas
const schema = buildSchema(`
    type Todo {
        name: String!
        completed: String!
        date: String!
        priority: String!
    }
    enum Completed {
        True
        False
    }
    enum Priority {
        High
        Normal
        Low
    }
    type Query {
        getAllTodos: [Todo!]!
        getTodo(id: Int!): Todo!
        getCompletedTodos(type: Completed!): [Todo!]!
        sortByPriority: [Todo!]!
    }
    type Mutation {
        addTodo(name: String!, priority: Priority): Todo!
        completeTodo(id: Int!): Todo!
    } 
`)

// resolvers
const root = {
    getAllTodos: () => {
        return Data
    },
    getTodo: ({ id }) => {
        return Data[id]
    },
    getCompletedTodos: ({ type }) => {
        return Data.filter(obj => obj['completed'] == type )
    },
    addTodo: ({ name, priority="Normal" }) => {
        const newDate = new Date
        const newObj = {"name": name, "completed": "False", "date": newDate.toDateString(), "priority": priority}
        Data.push(newObj)
        return newObj
    },
    completeTodo: ({ id }) => {
        Data[id]["completed"] = id
        return Data[id]
    },
    sortByPriority: () => {
        const numeralize = (str) => {
            return str == "High" ? 3 : str == "Normal" ? 2 : 1
        }
        return Data.sort((a, b) => {
            const numA = numeralize(a.priority)
            const numB = numeralize(b.priority)
            return numB - numA
        })
        
    }
}

// app
const app = express()
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
}))

// start
const port = 4000
app.listen(port, () => {
    console.log(`Running: http://localhost:${port}/graphql`)
})