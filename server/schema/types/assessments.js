import {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLID
} from 'graphql';

const AssessmentGDType = new GraphQLObjectType({
  name: 'AssessmentGDType',
  description: 'General Demographics of the person being assessed.',
  fields: {
    age: { type: GraphQLInt },
    consentOfParticipation: { type: GraphQLBoolean },
    dateOfBirth: { type: GraphQLString },
    firstName: { type: GraphQLString },
    languages: { type: new GraphQLList(GraphQLString) },
    lastName: { type: GraphQLString },
    mainLanguage: { type: GraphQLString },
    nickName: { type: GraphQLString },
    ssn: { type: GraphQLString }
  }
});

const AssessmentHHHType = new GraphQLObjectType({
  name: 'AssessmentHHHType',
  description: 'History of housing and homeless for the assessed person.',
  fields: {
    sleepsMostFrequentlyAt: { type: GraphQLString },
    timePassedSincePermanentHousing: { type: GraphQLString },
    timesHomelessInPastThreeYears: { type: GraphQLInt }
  }
});

const AssessmentRisksType = new GraphQLObjectType({
  name: 'AssessmentRisksType',
  description: 'Risks that have recently been taken by the assessed person.',
  fields: {
    timesReceivedErCareInSixMonths: { type: GraphQLInt },
    timesAmbulanceRidesInSixMonths: { type: GraphQLInt },
    timesHospitalizedAsInpatientInSixMonths: { type: GraphQLInt },
    timesUsedCrisisServiceInSixMonths: { type: GraphQLInt },
    timesPoliceTalksInSixMonths: { type: GraphQLInt },
    timesJailedInSixMonths: { type: GraphQLInt },
    timesAttackedSinceHomeless: { type: GraphQLInt },
    timesHarmedSelfOrOthersPastYear: { type: GraphQLInt },
    hasImmediateLegalIssues: { type: GraphQLBoolean },
    beingForcedUponToDoUnwantedThings: { type: GraphQLBoolean },
    beingExploitedForSexOrDrugs: { type: GraphQLBoolean }
  }
});

const AssessmentScoresType = new GraphQLObjectType({
  name: 'AssessmentScoresType',
  description: 'Risk assessment values.',
  fields: {
    basicDemoGraphicRiskScore: { type: GraphQLInt },
    riskOfHarmScore: { type: GraphQLInt },
    emergencyUseRiskScore: { type: GraphQLInt },
    historyRiskScore: { type: GraphQLInt },
    legalIssuesScore: { type: GraphQLInt },
    riskOrExplotationScore: { type: GraphQLInt },
    moneyManagementScore: { type: GraphQLInt },
    meaningfulDailyActivityScore: { type: GraphQLInt },
    selfCareScore: { type: GraphQLInt },
    socialRelationshipsScore: { type: GraphQLInt },
    physicalHealthScore: { type: GraphQLInt },
    substanceAbuseScore: { type: GraphQLInt },
    mentalHealthScore: { type: GraphQLInt },
    TriMobilityScore: { type: GraphQLInt },
    medicationsScore: { type: GraphQLInt },
    abuseAndTraumaScore: { type: GraphQLInt }
  }
});

const AssessmentWellnessType = new GraphQLObjectType({
  name: 'AssessmentWellnessType',
  description: 'Wellness of the assessed person.',
  fields: {
    forcedFromHousingBecauseHealth: { type: GraphQLBoolean },
    chronicHealthIssues: { type: GraphQLBoolean },
    interestedInHivAidsProgram: { type: GraphQLBoolean },
    limitingPhysicalDisabilities: { type: GraphQLBoolean },
    avoidsHelpWhenSick: { type: GraphQLBoolean },
    currentlyPregnant: { type: GraphQLBoolean },
    forcedFromHousingBecauseAlcoholOrDrugs: { type: GraphQLBoolean },
    maintainHousingDifficultyAlcoholDrugs: { type: GraphQLBoolean },
    maintainHousingDifficultyMentalHealth: { type: GraphQLBoolean },
    maintainHousingDifficultyHeadInjury: { type: GraphQLBoolean },
    maintainHousingDifficultyLearningDisability: { type: GraphQLBoolean },
    limitingMentalDisabilities: { type: GraphQLBoolean },
    notTakingPrescribedMedications: { type: GraphQLBoolean },
    sellingOrAbusingPrescribedMedications: { type: GraphQLBoolean },
    homelessnessCausedByAbuseOrTrauma: { type: GraphQLBoolean }
  }
});

const AssessmentSDFType = new GraphQLObjectType({
  name: 'AssessmentSDFType',
  description: 'Socializing and daily functioning of the assessed person.',
  fields: {
    owesMoney: { type: GraphQLBoolean },
    hasIncome: { type: GraphQLBoolean },
    hasMeaningfulActivity: { type: GraphQLBoolean },
    hasBasicSelfCare: { type: GraphQLBoolean },
    homelessDueToRelationships: { type: GraphQLBoolean }
  }
});

const AssessmentType = new GraphQLObjectType({
  name: 'AssessmentType',

  fields: () => ({
    _id: { type: GraphQLID },
    personId: { type: GraphQLString },
    overallRiskScore: {
      type: GraphQLInt,
      resolve: ({ scores }) => {
        const scoreTypes = Object.keys(scores);
        return scoreTypes.reduce((val, type) => {
          if (typeof scores[type] === 'number') {
            return scores[type] + val;
          }
          return val;
        }, 0);
      }
    },
    generalDemographics: { type: AssessmentGDType },
    historyOfHousingAndHomelessness: { type: AssessmentHHHType },
    risks: { type: AssessmentRisksType },
    scores: { type: AssessmentScoresType },
    socializingAndDailyFunctioning: { type: AssessmentSDFType },
    wellness: { type: AssessmentWellnessType }
  })
});

export default AssessmentType;
