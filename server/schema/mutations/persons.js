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
    employmentStatus: { type: GraphQLBoolean }
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
