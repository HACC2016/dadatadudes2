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
const timeRanges = ['0 - 6 months', '1 year - 2 years', '3+ years'];
const languages = ['french', 'english', 'hawaiian', 'filipino', 'samoan', 'chamorro', 'nukuoro', 'japanese'];
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
    alcoholDrugProblem: casual.coin_flip,
    benefitEbt: casual.coin_flip,
    benefitSsi: casual.coin_flip,
    benefitTanf: casual.coin_flip,
    benefitUnemployment: casual.coin_flip,
    benefitVeteran: casual.coin_flip,
    benefitWelfare: casual.coin_flip,
    dateCreated: randomDate(Date.now()),
    districtId: casual.random_element(councilDistricts).districtId,
    driversLicenseNumber: casual.card_number('American Express'),
    educationLevel: casual.random_element(education),
    employmentCurPay: casual.integer(from = 0, to = 1000),
    employmentLastEmployed: casual.date(format = 'YYYY-MM-DD'),
    employmentStatus: casual.coin_flip,
    ethnicity: casual.random_element(ethnicity),
    familyMembersAdult: casual.integer(from = 1, to = 3),
    familyMembersChildren: casual.integer(from = 0, to = 7),
    firstName: casual.first_name,
    gender: casual.random_element(gender),
    geoLocation: casual.random_element(geolocation),
    hawaiiStateId: casual.card_number('American Express'),
    lastHomelessDate: casual.random_element(homelessDate),
    lastHomelessAreaLived: casual.random_element(homelessCount),
    lastName: casual.last_name,
    lengthOfStayHawaii: casual.random_element(timeRanges),
    mentalHealthDisability: casual.coin_flip,
    onTheStreets: casual.coin_flip,
    otherDisability: casual.random_element(disabilites),
    reportIds: [reportId],
    reasonForHomelessness: casual.random_element(reasons),
    shelterName: (casual.random_element(shelterAdjective) + ' ' + casual.random_element(shelterPlace)),
    shelterStatus: casual.coin_flip,
    ssn: casual.phone,
    timeHomelessCount: casual.integer(from = 1, to = 3),
    veteran: casual.coin_flip
  };
}

function generateAssessment(person) {
  return {
    personId: person._id,
    generalDemographics: {
      age: person.age,
      consentOfParticipation: casual.coin_flip,
      dateOfBirth: casual.date(format = 'YYYY-MM-DD'),
      firstName: person.firstName,
      languages: casual.array_of_words(n = 7),
      lastName: person.lastName,
      mainLanguage: casual.random_element(languages),
      nickName: casual.first_name,
      ssn: person.ssn
    },
    historyOfHousingAndHomelessness: {
      sleepsMostFrequentlyAt: casual.street,
      timePassedSincePermanentHousing: casual.random_element(timeRanges),
      timesHomelessInPastThreeYears: casual.integer(from = 0, to = 4)
    },
    risks: {
      timesReceivedErCareInSixMonths: casual.integer(from = 0, to = 7),
      timesAmbulanceRidesInSixMonths: casual.integer(from = 0, to = 7),
      timesHospitalizedAsInpatientInSixMonths: casual.integer(from = 0, to = 7),
      timesUsedCrisisServiceInSixMonths: casual.integer(from = 0, to = 7),
      timesPoliceTalksInSixMonths: casual.integer(from = 0, to = 7),
      timesJailedInSixMonths: casual.integer(from = 0, to = 7),
      timesAttackedSinceHomeless: casual.integer(from = 0, to = 7),
      timesHarmedSelfOrOthersPastYear: casual.integer(from = 0, to = 7),
      hasImmediateLegalIssues: casual.coin_flip,
      beingForcedUponToDoUnwantedThings: casual.coin_flip,
      beingExploitedForSexOrDrugs: casual.coin_flip
    },
    scores: {
      basicDemographicRiskScore: casual.integer(from = 0, to = 1),
      riskOfHarmScore: casual.integer(from = 0, to = 1),
      emergencyUseRiskScore: casual.integer(from = 0, to = 1),
      historyRiskScore: casual.integer(from = 0, to = 1),
      legalIssuesScore: casual.integer(from = 0, to = 1),
      riskOfExploitationScore: casual.integer(from = 0, to = 1),
      moneyManagementScore: casual.integer(from = 0, to = 1),
      meaningfulDailyActivityScore: casual.integer(from = 0, to = 1),
      selfCareScore: casual.integer(from = 0, to = 1),
      socialRelationshipsScore: casual.integer(from = 0, to = 1),
      physicalHealthScore: casual.integer(from = 0, to = 1),
      substanceAbuseScore: casual.integer(from = 0, to = 1),
      mentalHealthScore: casual.integer(from = 0, to = 1),
      TriMobilityScore: casual.integer(from = 0, to = 1),
      medicationsScore: casual.integer(from = 0, to = 1),
      abuseAndTraumaScore: casual.integer(from = 0, to = 1)
    },
    socializingAndDailyFunctioning: {
      owesMoney: casual.coin_flip,
      hasIncome: casual.coin_flip,
      hasMeaningfulActivity: casual.coin_flip,
      hasBasicSelfCare: casual.coin_flip,
      homelessDueToRelationships: casual.coin_flip
    },
    wellness: {
      forcedFromHousingBecauseHealth: casual.coin_flip,
      chronicHealthIssues: casual.coin_flip,
      interestedInHivAidsProgram: casual.coin_flip,
      limitingPhysicalDisabilities: casual.coin_flip,
      avoidsHelpWhenSick: casual.coin_flip,
      currentlyPregnant: casual.coin_flip,
      forcedFromHousingBecauseAlcoholOrDrugs: casual.coin_flip,
      maintainHousingDifficultyAlcoholDrugs: casual.coin_flip,
      maintainHousingDifficultyMentalHealth: casual.coin_flip,
      maintainHousingDifficultyHeadInjury: casual.coin_flip,
      maintainHousingDifficultyLearningDisability: casual.coin_flip,
      limitingMentalDisabilities: casual.coin_flip,
      notTakingPrescribedMedications: casual.coin_flip,
      sellingOrAbusingPrescribedMedications: casual.coin_flip,
      homelessnessCausedByAbuseOrTrauma: casual.coin_flip
    }
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
    let persons = [];

    for (let i = 0; i < amount; i++) {
      persons.push(generatePerson(reportIds[i]));
    }

    return persons;
  },
  generateAssessments(amount, personObjects) {
    let assessments = [];

    for (let i = 0; i < amount; i++) {
      assessments.push(generateAssessment(personObjects[i]));
    }

    return assessments;
  }
};
