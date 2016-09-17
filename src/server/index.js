import 'babel-polyfill';
import bodyParser from 'body-parser';
import express from 'express';
import DataLoader from 'dataloader';
import graphqlHTTP from 'express-graphql';
import assert from 'assert';
import { MongoClient } from 'mongodb';

import mdbConstructor from './mongodb';
import renderApp from './renderApp';
import schema from './schema';

const DEBUG = process.env.NODE_ENV !== 'production';
const app = express();
const port = process.env.DEV_APP_PORT || process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (!DEBUG) {
  app.use(express.static(process.env.PUBLIC_DIR, {
    maxAge: '180 days'
  }));
}

MongoClient.connect(process.env.MONGO_URL, (err, mPool) => {
  assert.equal(err, null);
  const mdb = mdbConstructor(mPool);

  app.use('/graphql', bodyParser.json(), (req, res) => {
    const loaders = {
      usersByEmails: new DataLoader(mdb.getUsersByEmails),
      districtsByIds: new DataLoader(mdb.getDistrictsByIds),
      reportsByDistrictIds: new DataLoader(mdb.getReportsByDistrictIds)
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

});
