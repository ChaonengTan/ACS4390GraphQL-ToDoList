// dependancies
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

// schemas
const schema = buildSchema(`
    type Todo {
        name: String!
        completed: Boolean!
        date: String!
        id: String!
    }
    enum Completed {
        True
        False
    }
    type Query {
        getAllTodos: [Todo!]!
        getTodo(id: Int!): Todo!
        getCompletedTodos(type: Completed!): [Todo!]!
    }
`)

// resolvers
const root = {

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