import {
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType
} from 'graphql';

const DistrictType = new GraphQLObjectType({
  name: 'DistrictType',

  fields: () => ({
    _id: { type: GraphQLID },
    age: { type: GraphQLInt },
    alcoholDrugProblem: { type: GraphQLString },
    benefitEbt: { type: GraphQLString },
    benefitSsi: { type: GraphQLString },
    benefitTanf: { type: GraphQLString },
    benefitUnemployment: { type: GraphQLString },
    benefitVeteran: { type: GraphQLString },
    benefitWelfare: { type: GraphQLString },
    dateCreated: { type: GraphQLString },
    driversLicenseNumber: { type: GraphQLString },
    educationLevel: { type: GraphQLString },
    employmentCurPay: { type: GraphQLInt },
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
    reportIds: { type: GraphQLString },
    reasonForHomelessness: { type: GraphQLString },
    shelterName: { type: GraphQLString },
    shelterStatus: { type: GraphQLString },
    ssn: { type: GraphQLString },
    timeHomelessCount: { type: GraphQLString },
    veteran: { type: GraphQLString }
  })
});

export default DistrictType;
