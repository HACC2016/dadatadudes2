import {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';
import PersonType from '../types/persons';

const PersonInputType = new GraphQLInputObjectType({
  name: 'PersonInputType',

  fields: () => ({
    age: { type: GraphQLString },
    assessmentIds: { type: new GraphQLList(GraphQLString) },
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

export default {
  type: new GraphQLList(PersonType),
  args: {
    input: { type: new GraphQLNonNull(PersonInputType) }
  },
  resolve: (obj, { input }, { mdb }) => (
    mdb.addPerson(input)
  )
};
