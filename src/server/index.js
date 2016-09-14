import 'babel-polyfill';
import bodyParser from 'body-parser';
import express from 'express';
import DataLoader from 'dataloader';
import graphqlHTTP from 'express-graphql';

import adb from './arangodb';
import renderApp from './renderApp';
import schema from './schema';
import rawLoaders from './loaders';

const app = express();
const port = process.env.DEV_APP_PORT || process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(process.env.PUBLIC_DIR, {
    maxAge: '180 days'
  }));
}

const users = rawLoaders.userLoader(adb);
app.use('/graphql', bodyParser.json(), (req, res) => {
  const loaders = {
    usersByIds: new DataLoader(users.getUsersByIds)
  };

  graphqlHTTP(({
    schema,
    graphiql: true,
    context: { loaders }
  }))(req, res);
});

// This middleware should be last. Return the React app only if no other route is hit.
app.use(renderApp);
app.listen(port, () => {
  console.log(`Node app is running on port ${port}`);
});
