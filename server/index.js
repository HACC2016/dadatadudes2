import 'babel-polyfill';
import bodyParser from 'body-parser';
import express from 'express';
import DataLoader from 'dataloader';
import graphqlHTTP from 'express-graphql';
import assert from 'assert';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from '../webpack.config.js';
import mdbConstructor from './mongodb';
import schema from './schema';

const DEBUG = process.env.NODE_ENV !== 'production';
const app = express();
const port = process.env.DEV_APP_PORT || process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

if (!DEBUG) {
  app.use(express.static(process.env.PUBLIC_DIR, {
    maxAge: '180 days'
  }));
}

MongoClient.connect(process.env.MONGO_URL, (err, mPool) => {
  assert.equal(err, null);
  const mdb = mdbConstructor(mPool);

  app.post('/login', (req, res) => {
    if (req.body.email) {
      const user = mdb.getUserByEmail(req.body.email);

      if (user) {
        return res.sendStatus(200).end();
      }
    }

    return res.sendStatus(403).end();
  });

  app.use('/graphql', (req, res) => {
    const loaders = {
      districtsByIds: new DataLoader(mdb.getDistrictsByIds),
      districtsByCounties: new DataLoader(mdb.getDistrictsByCounties),
      reportsByDistrictIds: new DataLoader(mdb.getReportsByDistrictIds),
      personsByDistrictIds: new DataLoader(mdb.getPersonsByDistrictIds),
      personsByReportIds: new DataLoader(mdb.getPersonsByReportIds),
      personsByIds: new DataLoader(mdb.getPersonsByIds),
      assessmentsByPersonIds: new DataLoader(mdb.getAssessmentsByPersonIds),
      riskAveragesByDistrictIds: new DataLoader(mdb.getRiskAveragesByDistrictIds)
    };

    graphqlHTTP(({
      schema,
      graphiql: true,
      pretty: true,
      context: { mdb, loaders },
      formatError: error => ({
        message: error.message,
        locations: error.locations,
        stack: error.stack
      })
    }))(req, res);
  });

  if (DEBUG) {
    const compiler = webpack(config);
    const middleware = webpackMiddleware(compiler, {
      publicPath: config.output.publicPath,
      contentBase: './src',
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
      }
    });

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
    app.get('*', (req, res) => {
      res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '../dist/index.html')));
      res.end();
    });
  } else {
    app.use(express.static(path.join(__dirname, '../dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../dist/index.html'));
    });
  }
  app.listen(port, () => {
    console.log(`Node app is running on port ${port}`);
  });
});
