import 'babel-polyfill';
import bodyParser from 'body-parser';
import express from 'express';
import { apolloExpress, graphiqlExpress } from 'apollo-server';
import renderApp from './renderApp';

const app = express();
const port = process.env.DEV_APP_PORT || process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(process.env.PUBLIC_DIR, {
    maxAge: '180 days'
  }));
}

app.use('/graphql', bodyParser.json(), apolloExpress(({
  allowUndefinedInResolve: false,
  context: {}
})));

app.use('/graphiql', bodyParser.json(), graphiqlExpress({
  endpointUrl: '/graphql'
}));
// This middleware should be last. Return the React app only if no other route is hit.
app.use(renderApp);
app.listen(port, () => {
  console.log(`Node app is running on port ${port}`);
});
