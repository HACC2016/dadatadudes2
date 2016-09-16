const { MongoClient } = require('mongodb');
const co = require('co');
const assert = require('assert');

(function() {

  const down = () => (co(function* () {
    const db = yield MongoClient.connect('mongodb://localhost:27017/hacc');
    const users = db.collection('users');
    const districts = db.collection('districts');

    const userRemove = yield users.remove({});
    assert.equal(1, userInsert.removedCount);

    const districtRemove = yield districts.remove({});
    assert.equal(9, districtInsert.removedCount);

    db.close();
  }));

  const up = () => (co(function* () {
    const db = yield MongoClient.connect('mongodb://localhost:27017/hacc');
    const users = db.collection('users');
    const districts = db.collection('districts');

    const userInsert = yield users.insert({
      email: 'testing.email@email.com',
      role: 'admin',
      permissions: ['create', 'delete']
    });
    assert.equal(1, userInsert.insertedCount);

    const districtInsert = yield districts.insertMany(councilDistricts);
    assert.equal(9, districtInsert.insertedCount);

    db.close();
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

  const councilDistricts = [
  { districtId: '01', member: 'Kymberly Marcos Pine', email: 'kmpine@honolulu.gov', phone: '808-768-5001' },
  { districtId: '02', member: 'Ernest Y. Martin', email: 'emartin@honolulu.gov', phone: '808-768-5002' },
  { districtId: '03', member: 'Ikaika Anderson', email: 'ianderson@honolulu.gov', phone: '808-768-5003' },
  { districtId: '04', member: 'Trevor Ozawa', email: 'tozawa@honolulu.gov', phone: '808-768-5004' },
  { districtId: '05', member: 'Ann Kobayashi', email: 'akobayashi@honolulu.gov', phone: '808-768-5005' },
  { districtId: '06', member: 'Carol Fukunaga', email: 'cafukunaga@honolulu.gov', phone: '808-768-5006' },
  { districtId: '07', member: 'Joey Manahan', email: 'jmanahan@honolulu.gov', phone: '808-768-5007' },
  { districtId: '08', member: 'Brandon Elefante', email: 'belefante@honolulu.gov', phone: '808-768-5008' },
  { districtId: '09', member: 'Ron Menor', email: 'rmenor@honolulu.gov', phone: '808-768-5009' }
  ];

})();
