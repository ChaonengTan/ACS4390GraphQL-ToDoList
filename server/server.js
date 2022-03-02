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
        id: String!
    }
    enum Completed {
        "True"
        "False"
    }
    type Query {
        getAllTodos: [Todo!]!
        getTodo(id: Int!): Todo!
        getCompletedTodos(type: Completed!): [Todo!]!
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
        return Data.filter(obj => {
            obj['completed'] == type
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
    console.log('Running on port:'+port)
})