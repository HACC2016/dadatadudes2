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
      const persons = db.collection('persons');
      const assessments = db.collection('assessments');

      yield users.remove({});
      yield districts.remove({});
      yield reports.remove({});
      yield persons.remove({});
      yield assessments.remove({});

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
      const persons = db.collection('persons');
      const assessments = db.collection('assessments');

      const userInsert = yield users.insert({
        email: 'testing.email@email.com',
        role: 'admin',
        permissions: ['create', 'delete']
      });
      assert.equal(1, userInsert.insertedCount);

      const districtInsert = yield districts.insertMany(councilDistricts);
      assert.equal(28, districtInsert.insertedCount);

      const reportInsert = yield reports.insertMany(seeder.generateReports(150));
      assert.equal(150, reportInsert.insertedCount);

      const personInsert = yield persons.insertMany(seeder.generatePersons(60, reportInsert.insertedIds));
      assert.equal(60, personInsert.insertedCount);

      const assessmentObjects = seeder.generateAssessments(35, personInsert.ops);
      const assessmentInsert = yield assessments.insertMany(assessmentObjects);
      assert.equal(35, assessmentInsert.insertedCount);

      yield assessmentObjects.map(assessment => {
        const personUpdate = persons.updateOne({ _id: assessment.personId }, {
          $set: { assessmentIds: [assessment._id] }
        });
      });

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
