import express from 'express';
//import './firebase'
import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4';
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import cors from 'cors';
import {json} from 'body-parser';

import resolvers from './resolvers'
import path from 'path'
import {loadFilesSync} from '@graphql-tools/load-files'
import {mergeTypeDefs} from '@graphql-tools/merge'

interface MyContext {
  token?: string;
}

// 👇️ "/home/borislav/Desktop/javascript"
//const __dirname = path.dirname(__filename);

const typesArray = loadFilesSync(path.join(__dirname, 'schemas/**/*.graphql'))
const typeDefs = mergeTypeDefs(typesArray)

const app = express()


const port = Number(process.env.PORT ?? 8080);


async function startApolloServer() {
  // Our httpServer handles incoming requests to our Express app.
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.
  const httpServer = http.createServer(app);

  const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
  });
  await server.start();

  //app.use(morgan('dev'))

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({req}) => ({token: req.headers.token}),
    }),
  );

  app.get('/', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const pjson = require('../package.json');
    res.json({version: pjson.version})
  })

  await new Promise<void>((resolve) => httpServer.listen({
    port,
    host: '0.0.0.0'
  }, resolve));

  console.log(`🚀 Server ready at http://localhost:${port}/graphql`);

}

startApolloServer()
