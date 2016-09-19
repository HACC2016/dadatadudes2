import {
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLList,
  GraphQLObjectType
} from 'graphql';

import UserType from './types/user';
import DistrictType from './types/districts';
import ReportType from './types/reports';
import PersonType from './types/persons';
import AssessmentType from './types/assessments';

import AddReportMutation from './mutations/reports';

const QueryType = new GraphQLObjectType({
  name: 'QueryType',

  fields: () => ({
    user: {
      type: UserType,
      description: 'The user identified by a unique id.',
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (obj, args, { loaders }) => (
        loaders.usersByEmails.load(args.email)
      )
    },

    district: {
      type: new GraphQLList(DistrictType),
      description: 'The city council district, and associated council member.',
      args: {
        districtId: { type: GraphQLString },
        county: { type: GraphQLString }
      },
      resolve: (obj, args, { mdb, loaders }) => {
        if (args.districtId) {
          return loaders.districtsByIds.load(args.districtId);
        } else if (args.county) {
          return loaders.districtsByCounties.load(args.county);
        }

        return mdb.getAllDistricts();
      }
    },

    reports: {
      type: new GraphQLList(ReportType),
      description: 'Reported sightings or counts of homeless persons.',
      args: {
        districtId: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (obj, args, { loaders }) => (
        loaders.reportsByDistrictIds.load(args.districtId)
      )
    },

    persons: {
      type: new GraphQLList(PersonType),
      description: 'Description and information of a homeless individual.',
      args: {
        districtId: { type: GraphQLString },
        _id: { type: GraphQLString }
      },
      resolve: (obj, args, { mdb, loaders }) => {
        if (args.districtId) {
          return loaders.personsByDistrictIds.load(args.districtId);
        } else if (args._id) {
          return loaders.personsByIds.load(args._id);
        }

        return mdb.getAllPersons();
      }
    },

    assessments: {
      type: new GraphQLList(AssessmentType),
      description: 'Assessment description of a homeless individual',
      args: {
        personId: { type: GraphQLString }
      },
      resolve: (obj, args, { loaders }) => (
        loaders.assessmentsByPersonIds.load(args.personId)
      )
    }
  })
});

const MutationType = new GraphQLObjectType({
  name: 'MutationType',

  fields: () => ({
    AddReport: AddReportMutation
  })
});

const Schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType
});

export default Schema;
