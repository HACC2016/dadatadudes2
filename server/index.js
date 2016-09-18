import 'babel-polyfill';
import bodyParser from 'body-parser';
import express from 'express';
import DataLoader from 'dataloader';
import graphqlHTTP from 'express-graphql';
import assert from 'assert';
import { MongoClient } from 'mongodb';
import path from 'path';
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config.js');


import mdbConstructor from './mongodb';
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
      districtsByIds: new DataLoader(mdb.getDistrictsByIds)
    };

    graphqlHTTP(({
      schema,
      graphiql: true,
      context: { loaders }
    }))(req, res);
  });
  
  if (DEBUG) {
    const compiler = webpack(config);
    const middleware = webpackMiddleware(compiler, {
      publicPath: config.output.publicPath,
      contentBase: 'src',
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
    app.get('*', function response(req, res) {
      res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
      res.end();
    });
  } else {
    app.use(express.static(__dirname + '/dist'));
    app.get('*', function response(req, res) {
      res.sendFile(path.join(__dirname, 'dist/index.html'));
    });
  }
  app.listen(port, () => {
    console.log(`Node app is running on port ${port}`);
  });

});
