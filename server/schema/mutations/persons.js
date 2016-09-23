import {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLBoolean
} from 'graphql';
import PersonType from '../types/persons';

const PersonInputType = new GraphQLInputObjectType({
  name: 'PersonInputType',

  fields: () => ({
    age: { type: GraphQLInt },
    assessmentIds: { type: new GraphQLList(GraphQLString) },
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

export default {
  type: new GraphQLList(PersonType),
  args: {
    input: { type: new GraphQLNonNull(PersonInputType) }
  },
  resolve: (obj, { input }, { mdb }) => (
    mdb.addPerson(input)
  )
};
