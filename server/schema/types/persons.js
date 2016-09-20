import {
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
  GraphQLObjectType
} from 'graphql';
import AssessmentType from './assessments';

const PersonType = new GraphQLObjectType({
  name: 'PersonType',

  fields: () => ({
    _id: { type: GraphQLID },
    age: { type: GraphQLInt },
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
    alcoholDrugProblem: { type: GraphQLBoolean },
    benefitEbt: { type: GraphQLBoolean },
    benefitSsi: { type: GraphQLBoolean },
    benefitTanf: { type: GraphQLBoolean },
    benefitUnemployment: { type: GraphQLBoolean },
    benefitVeteran: { type: GraphQLBoolean },
    benefitWelfare: { type: GraphQLBoolean },
    dateCreated: { type: GraphQLString },
    districtId: { type: GraphQLString },
    driversLicenseNumber: { type: GraphQLString },
    educationLevel: { type: GraphQLString },
    employmentCurPay: { type: GraphQLInt },
    employmentLastEmployed: { type: GraphQLString },
    employmentStatus: { type: GraphQLBoolean },
    ethnicity: { type: GraphQLString },
    familyMembersAdult: { type: GraphQLInt },
    familyMembersChildren: { type: GraphQLInt },
    firstName: { type: GraphQLString },
    gender: { type: GraphQLString },
    geoLocation: { type: GraphQLString },
    hawaiiStateId: { type: GraphQLString },
    lastHomelessDate: { type: GraphQLString },
    lastHomelessAreaLived: { type: GraphQLString },
    lastName: { type: GraphQLString },
    lengthOfStayHawaii: { type: GraphQLString },
    mentalHealthDisability: { type: GraphQLBoolean },
    onTheStreets: { type: GraphQLBoolean },
    otherDisability: { type: GraphQLString },
    reportIds: { type: new GraphQLList(GraphQLString) },
    reasonForHomelessness: { type: GraphQLString },
    shelterName: { type: GraphQLString },
    shelterStatus: { type: GraphQLBoolean },
    ssn: { type: GraphQLString },
    timeHomelessCount: { type: GraphQLInt },
    veteran: { type: GraphQLString }
  })
});

export default PersonType;
