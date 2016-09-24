import {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql';
import AssessmentType from '../types/assessments';

const AssessmentGDInputType = new GraphQLInputObjectType({
  name: 'AssessmentGDInputType',
  description: 'General Demographics of the person being assessed.',
  fields: {
    age: { type: GraphQLString },
    consentOfParticipation: { type: GraphQLString },
    dateOfBirth: { type: GraphQLString },
    firstName: { type: GraphQLString },
    languages: { type: new GraphQLList(GraphQLString) },
    lastName: { type: GraphQLString },
    mainLanguage: { type: GraphQLString },
    nickName: { type: GraphQLString },
    ssn: { type: GraphQLString }
  }
});

const AssessmentHHHInputType = new GraphQLInputObjectType({
  name: 'AssessmentHHHInputType',
  description: 'History of housing and homeless for the assessed person.',
  fields: {
    sleepsMostFrequentlyAt: { type: GraphQLString },
    timePassedSincePermanentHousing: { type: GraphQLString },
    timesHomelessInPastThreeYears: { type: GraphQLString }
  }
});

const AssessmentRisksInputType = new GraphQLInputObjectType({
  name: 'AssessmentRisksInputType',
  description: 'Risks that have recently been taken by the assessed person.',
  fields: {
    timesReceivedErCareInSixMonths: { type: GraphQLString },
    timesAmbulanceRidesInSixMonths: { type: GraphQLString },
    timesHospitalizedAsInpatientInSixMonths: { type: GraphQLString },
    timesUsedCrisisServiceInSixMonths: { type: GraphQLString },
    timesPoliceTalksInSixMonths: { type: GraphQLString },
    timesJailedInSixMonths: { type: GraphQLString },
    timesAttackedSinceHomeless: { type: GraphQLString },
    timesHarmedSelfOrOthersPastYear: { type: GraphQLString },
    hasImmediateLegalIssues: { type: GraphQLString },
    beingForcedUponToDoUnwantedThings: { type: GraphQLString },
    beingExploitedForSexOrDrugs: { type: GraphQLString }
  }
});

const AssessmentWellnessInputType = new GraphQLInputObjectType({
  name: 'AssessmentWellnessInputType',
  description: 'Wellness of the assessed person.',
  fields: {
    forcedFromHousingBecauseHealth: { type: GraphQLString },
    chronicHealthIssues: { type: GraphQLString },
    interestedInHivAidsProgram: { type: GraphQLString },
    limitingPhysicalDisabilities: { type: GraphQLString },
    avoidsHelpWhenSick: { type: GraphQLString },
    currentlyPregnant: { type: GraphQLString },
    forcedFromHousingBecauseAlcoholOrDrugs: { type: GraphQLString },
    maintainHousingDifficultyAlcoholDrugs: { type: GraphQLString },
    maintainHousingDifficultyMentalHealth: { type: GraphQLString },
    maintainHousingDifficultyHeadInjury: { type: GraphQLString },
    maintainHousingDifficultyLearningDisability: { type: GraphQLString },
    limitingMentalDisabilities: { type: GraphQLString },
    notTakingPrescribedMedications: { type: GraphQLString },
    sellingOrAbusingPrescribedMedications: { type: GraphQLString },
    homelessnessCausedByAbuseOrTrauma: { type: GraphQLString }
  }
});

const AssessmentSDFInputType = new GraphQLInputObjectType({
  name: 'AssessmentSDFInputType',
  description: 'Socializing and daily functioning of the assessed person.',
  fields: {
    owesMoney: { type: GraphQLString },
    hasIncome: { type: GraphQLString },
    hasMeaningfulActivity: { type: GraphQLString },
    hasBasicSelfCare: { type: GraphQLString },
    homelessDueToRelationships: { type: GraphQLString }
  }
});

const AssessmentScoresInputType = new GraphQLInputObjectType({
  name: 'AssessmentScoresInputType',
  description: 'Risk assessment values.',
  fields: {
    basicDemographicRiskScore: { type: GraphQLInt },
    noHousingScore: { type: GraphQLInt },
    consectutiveHomelessnessScore: { type: GraphQLInt },
    riskOfHarmScore: { type: GraphQLInt },
    emergencyUseRiskScore: { type: GraphQLInt },
    legalIssuesScore: { type: GraphQLInt },
    riskOfExploitationScore: { type: GraphQLInt },
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

const AssessmentInputType = new GraphQLInputObjectType({
  name: 'AssessmentInputType',

  fields: () => ({
    personId: { type: GraphQLString },
    districtId: { type: GraphQLString },
    generalDemographics: { type: AssessmentGDInputType },
    historyOfHousingAndHomelessness: { type: AssessmentHHHInputType },
    risks: { type: AssessmentRisksInputType },
    scores: { type: AssessmentScoresInputType },
    socializingAndDailyFunctioning: { type: AssessmentSDFInputType },
    wellness: { type: AssessmentWellnessInputType }
  })
});

export default {
  type: new GraphQLList(AssessmentType),
  args: {
    input: { type: new GraphQLNonNull(AssessmentInputType) }
  },
  resolve: (obj, { input }, { mdb }) => (
    mdb.addAssessment(input)
  )
};
