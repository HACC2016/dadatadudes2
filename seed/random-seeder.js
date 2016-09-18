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
const reasons = ['drugs or alcohol', 'unemployment', 'family', 'domestic abuse'];
const lengthsOfStay = ['0 - 6 months', '1 year - 2 years', '3+ years'];
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

function generatePerson(reportId) {
  return {
    age: casual.integer(from = 14, to = 67),
    alcoholDrugProblem: casual.random_element(coin_flip),
    benefitEbt: casual.random_element(coin_flip),
    benefitSsi: casual.random_element(coin_flip),
    benefitTanf: casual.random_element(coin_flip),
    benefitUnemployment: casual.random_element(coin_flip),
    benefitVeteran: casual.random_element(coin_flip),
    benefitWelfare: casual.random_element(coin_flip),
    dateCreated: randomDate(Date.now()),
    driversLicenseNumber: casual.card_number(),
    educationLevel: casual.random_element(education),
    employmentCurPay: casual.integer(from = 0, to = 1000),
    employmentLastEmployed: casual.date(format = 'YYYY-MM-DD'),
    employmentStatus: casual.random_element(coin_flip),
    ethnicity: casual.random_element(ethnicity),
    familyMembersAdult: casual.integer(from = 1, to = 3),
    familyMembersChildren: casual.integer(from = 0, to = 7),
    firstName: casual.first_name,
    gender: casual.random_element(gender),
    geoLocation: casual.random_element(geolocation),
    hawaiiStateId: casual.card_number(),
    lastHomelessDate: casual.random_element(homelessDate),
    lastHomelessAreaLived: casual.random_element(homelessCount),
    lastName: casual.last_name,
    lengthOfStayHawaii: casual.random_element(lengthsOfStay),
    mentalHealthDisability: casual.random_element(coin_flip),
    onTheStreets: casual.random_element(coin_flip),
    otherDisability: casual.random_element(disabilites),
    reportIds: [reportId],
    reasonForHomelessness: casual.random_element(reasons),
    shelterName: (casual.random_element(shelterAdjective) + ' ' + casual.random_element(shelterPlace)),
    shelterStatus: casual.random_element(coin_flip),
    ssn: casual.phone,
    timeHomelessCount: casual.integer(from = 1, to = 3),
    veteran: casual.random_element(coin_flip)
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
  generatePersons(amount, reportIds) {
    let reportIdPool = reportIds.slice();
    let persons = [];

    for (let i = 0; i < amount; i++) {
      let reportId = reportIdPool[i];
      persons.push(generatePerson(reportId));
    }

    return persons;
  },
  generateAssessment() {

  }
};
