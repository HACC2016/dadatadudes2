const { MongoClient } = require('mongodb');
const co = require('co');
const assert = require('assert');
const councilDistricts = require('./districts');
const seeder = require('./random-seeder');

(function() {

  const down = () => (co(function* () {
    try {
      const db = yield MongoClient.connect('mongodb://localhost:27017/hacc');
      const users = db.collection('users');
      const districts = db.collection('districts');
      const reports = db.collection('reports');

      const userRemove = yield users.remove({});
      const districtRemove = yield districts.remove({});
      const reportRemove = yield reports.remove({});

      db.close();
    } catch (err) {
      console.error(err.stack);
    }
  }));

  const up = () => (co(function* () {
    try {
      const db = yield MongoClient.connect('mongodb://localhost:27017/hacc');
      const users = db.collection('users');
      const districts = db.collection('districts');
      const reports = db.collection('reports');

      const userInsert = yield users.insert({
        email: 'testing.email@email.com',
        role: 'admin',
        permissions: ['create', 'delete']
      });
      assert.equal(1, userInsert.insertedCount);

      const districtInsert = yield districts.insertMany(councilDistricts);
      assert.equal(9, districtInsert.insertedCount);

      const reportInsert = yield reports.insertMany(seeder.generateReports(20));
      assert.equal(20, reportInsert.insertedCount);

      db.close();
    } catch (err) {
      console.error(err.stack);
    }
  }));

  switch (process.argv[2]) {
    case 'up':
      up();
      break;
    case 'down':
      down();
      break;
    default:
      console.log(`
        \n
        use 'up' to seed local mongodb
        use 'down' to reset local mongodb
      `);
      break;
  }

})();
