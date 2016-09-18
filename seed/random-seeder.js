const casual = require('casual');
const councilDistricts = require('./districts');

const education = ['ged', 'someCollege', 'associate', 'high-school', 'bachelors', 'masters'];
const ethnicity = ['hawaiian', 'caucasian', 'african-american', 'asian', 'multiple',
                   'native-american', 'other-pacific-islander', 'unknown'];
const gender = ['male', 'female', 'transgender', 'refused'];
const homelessDate = ['lessThanYear', 'oneYearOrLonger', 'unknown', 'refused'];
const homelessCount = ['oneToThreeTimes', 'fourOrMoreTimes', 'unknown', 'refused'];
const disabilites = ['missing-limb', 'blind', 'deaf', 'polio'];
const shelterAdjective = ['sunny', 'fresh', 'new', 'sunrise', 'golden'];
const shelterPlace = ['hills', 'meadows', 'beginnings', 'start', 'horizon'];
const geolocation = ['21.4307732,-158.1727855', '21.4300338,-158.1886537', '21.4464635,-158.2032338',
                     '21.4650675,-158.208971', '21.2937603,-157.8671448', '21.2964518,-157.8650594',
                     '21.306360,-158.052092', '21.307289,-158.112380', '21.330125,-157.691935',
                     '21.267555,-157.821828'];
const coin_flip = ['yes', 'no'];
const start = new Date(2015, 1, 1);

function randomDate(now) {
  return new Date(start + Math.random() * (now - start));
}

function generateReport() {
  return {
    districtId: casual.random_element(councilDistricts).districtId,
    reportedAt: randomDate(Date.now())
  };
}

module.exports = {
  generateReports(amount) {
    let reports = [];

    for (let i = 0; i < amount; i++) {
      reports.push(generateReport());
    }

    return reports;
  },
  generatePerson() {

  },
  generateAssessment() {

  }
};
