import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLID
} from 'graphql';

const AssessmentGDType = new GraphQLObjectType({
  name: 'AssessmentGDType',
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

const AssessmentHHHType = new GraphQLObjectType({
  name: 'AssessmentHHHType',
  description: 'History of housing and homeless for the assessed person.',
  fields: {
    sleepsMostFrequentlyAt: { type: GraphQLString },
    timePassedSincePermanentHousing: { type: GraphQLString },
    timesHomelessInPastThreeYears: { type: GraphQLString }
  }
});

const AssessmentRisksType = new GraphQLObjectType({
  name: 'AssessmentRisksType',
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

const AssessmentWellnessType = new GraphQLObjectType({
  name: 'AssessmentWellnessType',
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

const AssessmentSDFType = new GraphQLObjectType({
  name: 'AssessmentSDFType',
  description: 'Socializing and daily functioning of the assessed person.',
  fields: {
    owesMoney: { type: GraphQLString },
    hasIncome: { type: GraphQLString },
    hasMeaningfulActivity: { type: GraphQLString },
    hasBasicSelfCare: { type: GraphQLString },
    homelessDueToRelationships: { type: GraphQLString }
  }
});

const AssessmentScoresType = new GraphQLObjectType({
  name: 'AssessmentScoresType',
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

const summaryResolvers = {
  preSurveyScore: {
    type: GraphQLInt,
    resolve: ({ scores }) => (
      scores.basicDemographicRiskScore || 0
    )
  },
  historyOfHousingAndHomelessnessScore: {
    type: GraphQLInt,
    resolve: ({ scores }) => {
      const noHousingScore = scores.noHousingScore || 0;
      const consectutiveHomelessnessScore = scores.consectutiveHomelessnessScore || 0;
      return noHousingScore + consectutiveHomelessnessScore;
    }
  },
  risksScore: {
    type: GraphQLInt,
    resolve: ({ scores }) => {
      const emergencyUseRiskScore = scores.emergencyUseRiskScore || 0;
      const riskOfHarmScore = scores.riskOfHarmScore || 0;
      const legalIssuesScore = scores.legalIssuesScore || 0;
      const riskOfExploitationScore = scores.riskOfExploitationScore || 0;

      return emergencyUseRiskScore + riskOfHarmScore + legalIssuesScore + riskOfExploitationScore;
    }
  },
  socializingAndDailyFunctionsScore: {
    type: GraphQLInt,
    resolve: ({ scores }) => {
      const moneyManagementScore = scores.moneyManagementScore || 0;
      const meaningfulDailyActivityScore = scores.meaningfulDailyActivityScore || 0;
      const selfCareScore = scores.selfCareScore || 0;
      const socialRelationshipsScore = scores.socialRelationshipsScore || 0;

      return moneyManagementScore +
             meaningfulDailyActivityScore +
             selfCareScore +
             socialRelationshipsScore;
    }
  },
  wellnessScore: {
    type: GraphQLInt,
    resolve: ({ scores }) => {
      const physicalHealthScore = scores.physicalHealthScore || 0;
      const substanceAbuseScore = scores.substanceAbuseScore || 0;
      const mentalHealthScore = scores.mentalHealthScore || 0;
      const TriMobilityScore = scores.TriMobilityScore || 0;
      const medicationsScore = scores.medicationsScore || 0;
      const abuseAndTraumaScore = scores.abuseAndTraumaScore || 0;
      return physicalHealthScore +
             substanceAbuseScore +
            mentalHealthScore +
            TriMobilityScore +
            medicationsScore +
            abuseAndTraumaScore;
    }
  }
};

const AssessmentType = new GraphQLObjectType({
  name: 'AssessmentType',

  fields: () => ({
    _id: { type: GraphQLID },
    personId: { type: GraphQLString },
    districtId: { type: GraphQLString },
    overallRiskScore: {
      type: GraphQLString,
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
    ...summaryResolvers,
    generalDemographics: { type: AssessmentGDType },
    historyOfHousingAndHomelessness: { type: AssessmentHHHType },
    risks: { type: AssessmentRisksType },
    scores: { type: AssessmentScoresType },
    socializingAndDailyFunctioning: { type: AssessmentSDFType },
    wellness: { type: AssessmentWellnessType }
  })
});

export default AssessmentType;
