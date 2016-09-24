import {
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLObjectType
} from 'graphql';
import AssessmentType from './assessments';

const PersonType = new GraphQLObjectType({
  name: 'PersonType',

  fields: () => ({
    _id: { type: GraphQLID },
    age: { type: GraphQLString },
    assessmentIds: { type: new GraphQLList(GraphQLString) },
    assessments: {
      type: new GraphQLList(AssessmentType),
      description: 'Risk Assessments for this individual',
      resolve: ({ _id }, args, { loaders }) => {
        if (_id) {
          return loaders.assessmentsByPersonIds.load(_id);
        }
        return [];
      }
    },
    alcoholDrugProblem: { type: GraphQLString },
    benefitEbt: { type: GraphQLString },
    benefitSsi: { type: GraphQLString },
    benefitTanf: { type: GraphQLString },
    benefitUnemployment: { type: GraphQLString },
    benefitVeteran: { type: GraphQLString },
    benefitWelfare: { type: GraphQLString },
    dateCreated: { type: GraphQLString },
    districtId: { type: GraphQLString },
    driversLicenseNumber: { type: GraphQLString },
    educationLevel: { type: GraphQLString },
    employmentCurPay: { type: GraphQLString },
    employmentLastEmployed: { type: GraphQLString },
    employmentStatus: { type: GraphQLString },
    ethnicity: { type: GraphQLString },
    familyMembersAdult: { type: GraphQLString },
    familyMembersChildren: { type: GraphQLString },
    firstName: { type: GraphQLString },
    gender: { type: GraphQLString },
    geoLocation: { type: GraphQLString },
    hawaiiStateId: { type: GraphQLString },
    lastHomelessDate: { type: GraphQLString },
    lastHomelessAreaLived: { type: GraphQLString },
    lastName: { type: GraphQLString },
    lengthOfStayHawaii: { type: GraphQLString },
    mentalHealthDisability: { type: GraphQLString },
    onTheStreets: { type: GraphQLString },
    otherDisability: { type: GraphQLString },
    reportIds: { type: new GraphQLList(GraphQLString) },
    reasonForHomelessness: { type: GraphQLString },
    shelterName: { type: GraphQLString },
    shelterStatus: { type: GraphQLString },
    ssn: { type: GraphQLString },
    timeHomelessCount: { type: GraphQLString },
    veteran: { type: GraphQLString }
  })
});

export default PersonType;
