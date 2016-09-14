import { Database } from 'arangojs';

const host = process.env.ARANGODB_HOST;
const port = process.env.ARANGODB_PORT;
const databaseName = process.env.ARANGODB_DB;
const username = process.env.ARANGODB_USERNAME;
const password = process.env.ARANGODB_PASSWORD;

const adb = new Database({
  url: `http://${username}:${password}@${host}:${port}`,
  databaseName
});

export default adb;
