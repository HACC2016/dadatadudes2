import {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLNonNull
} from 'graphql';
import AssessmentType from '../types/assessments';

const AssessmentGDInputType = new GraphQLInputObjectType({
  name: 'AssessmentGDInputType',
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

const AssessmentHHHInputType = new GraphQLInputObjectType({
  name: 'AssessmentHHHInputType',
  description: 'History of housing and homeless for the assessed person.',
  fields: {
    sleepsMostFrequentlyAt: { type: GraphQLString },
    timePassedSincePermanentHousing: { type: GraphQLString },
    timesHomelessInPastThreeYears: { type: GraphQLInt }
  }
});

const AssessmentRisksInputType = new GraphQLInputObjectType({
  name: 'AssessmentRisksInputType',
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

const AssessmentWellnessInputType = new GraphQLInputObjectType({
  name: 'AssessmentWellnessInputType',
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

const AssessmentSDFInputType = new GraphQLInputObjectType({
  name: 'AssessmentSDFInputType',
  description: 'Socializing and daily functioning of the assessed person.',
  fields: {
    owesMoney: { type: GraphQLBoolean },
    hasIncome: { type: GraphQLBoolean },
    hasMeaningfulActivity: { type: GraphQLBoolean },
    hasBasicSelfCare: { type: GraphQLBoolean },
    homelessDueToRelationships: { type: GraphQLBoolean }
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
