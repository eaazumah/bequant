import {
    ApolloServerPluginLandingPageDisabled,
    ApolloServerPluginLandingPageGraphQLPlayground
} from 'apollo-server-core';
import { ApolloServer, ApolloServerExpressConfig } from 'apollo-server-express';
import { Application } from 'express';
import depthLimit from 'graphql-depth-limit';
import schema from '../graphql/schema';
import createContext from './create.apollo.context';
export const createApolloServer = (config: ApolloServerExpressConfig) => {
    const playground =
        process.env.NODE_ENV === 'production'
            ? ApolloServerPluginLandingPageDisabled()
            : ApolloServerPluginLandingPageGraphQLPlayground();

    const server = new ApolloServer({
        schema,
        introspection: true,
        context: createContext,
        validationRules: [depthLimit(6)],
        plugins: [playground],
        ...config
    });

    return server;
};

const startApolloServer = async (app: Application) => {
    const server = createApolloServer({
        schema,
        introspection: true,
        context: createContext,
        validationRules: [depthLimit(6)]
    });
    await server.start();
    server.applyMiddleware({ app });
    return server;
};

export default startApolloServer;
