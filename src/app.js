const { GraphQLServer } = require('graphql-yoga');

const { PORT } = require('./config');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');


const options = {
  port: PORT,
  playground: '/graphiql'
};


module.exports = async () => {
  const server = new GraphQLServer({ typeDefs, resolvers });
  const app = server.start(options);

  console.log(`Server is running on localhost:${PORT}`);
  return app;
}
