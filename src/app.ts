import { createServer } from 'http';
import mongoDBConnect from './datastores/mongo-db';
import router from './routes/router';
import startApolloServer from './server/apollo.server';
import createExpressApp from './server/create.express.app';
import initEnv from './services/init.env';
import createIOServer from './sockets/io.server';

const startApp = async () => {
    try {
        initEnv();

        await mongoDBConnect();

        const PORT = process.env.PORT || 7000;

        const app = createExpressApp();
        const httpServer = createServer(app);

        createIOServer(httpServer);

        const server = await startApolloServer(app);

        app.use('/api', router);

        app.use((_req, res) => {
            res.status(404).send('Unable to find the requested resource!');
        });

        httpServer.listen(PORT, () => {
            console.log(`🚀 Server ready at http://localhost:${PORT}`);
            console.log(`🚀GraphQL Server ready at http://localhost:${PORT}${server.graphqlPath}`);
            // console.log(`🚀 Subscriptions ready at ws://localhost:${process.env.PORT}${server.subscriptionsPath}`);
        });
    } catch (error) {
        console.log(error);
    }
};

startApp();
