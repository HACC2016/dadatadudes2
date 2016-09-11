import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import config from './config';

const WEBPACK_PORT = 3000;
const APP_PORT = 8080;

Object.keys(config.entry)
.forEach((key) => {
  config.entry[key].unshift(`webpack-dev-server/client?http://localhost:${WEBPACK_PORT}/`);
});

const compiler = webpack(config);
const APP_PORT_CONNECTED = `http://localhost:${APP_PORT}`;
console.log(`Proxying requests to:${APP_PORT_CONNECTED}`)

const app = new WebpackDevServer(compiler, {
  contentBase: '/assets/',
  publicPath: '/assets/',
  headers: { 'Access-Control-Allow-Origin': '*' },
  proxy: {
    '*': `http://localhost:${APP_PORT}`
  },
  stats: { colors: true }
});

app.listen(WEBPACK_PORT, () => {
  console.log(`Webpack dev server is now running on http://localhost:${WEBPACK_PORT}`);
});
