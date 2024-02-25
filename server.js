const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');
const path = require('path');

let containerStatus = 'stopped';

const typeDefs = gql`
    type Query {
        status: String
    }

    type Mutation {
        spinUpContainer: ContainerResponse
        spinDownContainer: ContainerResponse
    }

    type ContainerResponse {
        status: String
        message: String  
    }
    
`;

const resolvers = {
    Query: {
        status: () => containerStatus,
    },
    
    Mutation: {
        spinUpContainer: () => {
            containerStatus = 'running';
            return { status: containerStatus, message: 'Container spin up successfully.' };
        },
        spinDownContainer: () => {
            containerStatus = 'stopped';
            return { status: containerStatus, message: 'Container spin down successfully.' };
        }
    }
};

async function startApolloServer() {
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();

    const app = express();
    app.use(cors());

    // Serve static files from the 'public' directory
    app.use(express.static(path.join(__dirname)));

    // Define route to serve the index.html file
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
    });

    server.applyMiddleware({ app });

    const port = 3000;

    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}/graphql`);
    });
}

startApolloServer();
