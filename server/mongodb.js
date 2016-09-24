import _ from 'lodash';
import { ObjectID } from 'mongodb';

export default function mdbConstructor(mPool) {
  const orderedFor = (rows, collection, field, singleObject) => {
    // return the rows ordered for the collection
    const inGroupsOfField = _.groupBy(rows, field);
    return collection.map(element => {
      const elementArray = inGroupsOfField[element];
      if (elementArray) {
        return singleObject ? elementArray[0] : elementArray;
      }
      return singleObject ? {} : [];
    });
  };

  const orderedForAverage = (rows, collection, field) => {
    // return the rows ordered for the collection
    const inGroupsOfField = _.groupBy(rows, field);
    return collection.map(element => {
      const elementArray = inGroupsOfField[element];
      if (elementArray) {
        return elementArray.reduce((val, ele) => {
          if (ele.scores) {
            const scoreTypes = Object.keys(ele.scores);
            return val + scoreTypes.reduce((value, type) => {
              if (typeof ele.scores[type] === 'number') {
                return ele.scores[type] + value;
              }
              return val;
            }, 0);
          }

          return val;
        }, 0) / elementArray.length;
      }
      return 0;
    });
  };

  const mapIdsToObjectIDs = (ids) => (
    ids.map(id => new ObjectID(id))
  );

  return {

    addReport(input) {
      return mPool.collection('reports')
        .insertOne(input)
        .then(r => r.ops);
    },

    addPerson(input) {
      return mPool.collection('persons')
        .insertOne(input)
        .then(r => r.ops);
    },

    addAssessment(input) {
      return mPool.collection('assessments')
        .insertOne(input)
        .then(({ ops }) => {
          const assessment = ops[0];
          return this.addPerson({
            age: assessment.generalDemographics.age,
            assessmentIds: [assessment._id],
            ethnicity: assessment.generalDemographics.ethnicity,
            gender: assessment.generalDemographics.gender,
            districtId: assessment.districtId,
            firstName: assessment.generalDemographics.firstName,
            lastName: assessment.generalDemographics.lastName,
            ssn: assessment.generalDemographics.ssn
          })
          .then((result) => {
            mPool.collection('assessments').updateOne({ _id: assessment._id }, {
              $set: { personId: result[0]._id }
            });
            return [{
              ...assessment,
              personId: result[0]._id
            }];
          });
        });
    },

    getUserByEmail(email) {
      return mPool.collection('users')
        .findOne({ email })
        .then(user => user);
    },

    getAllDistricts() {
      return mPool.collection('districts')
        .find()
        .toArray()
        .then(rows =>
          rows
        );
    },

    getDistrictsByIds(districtIds) {
      return mPool.collection('districts')
        .find({ districtId: { $in: districtIds } })
        .toArray()
        .then(rows =>
          orderedFor(rows, districtIds, 'districtId', true)
        );
    },

    getDistrictsByCounties(counties) {
      return mPool.collection('districts')
        .find({ county: { $in: counties } })
        .toArray()
        .then(rows =>
          orderedFor(rows, counties, 'county', false)
        );
    },

    getReportsByDistrictIds(districtIds) {
      return mPool.collection('reports')
        .find({ districtId: { $in: districtIds } })
        .toArray()
        .then(rows =>
          orderedFor(rows, districtIds, 'districtId', false)
        );
    },

    getPersonsByIds(ids) {
      const ObjectIds = mapIdsToObjectIDs(ids);
      return mPool.collection('persons')
        .find({ _id: { $in: ObjectIds } })
        .toArray()
        .then(rows =>
          orderedFor(rows, ObjectIds, '_id', false)
        );
    },

    getPersonCountsByDistrictId(districtId) {
      return mPool.collection('persons')
        .find({ districtId })
        .count()
        .then(count => count);
    },

    getPersonsByDistrictIds(districtIds) {
      return mPool.collection('persons')
        .find({ districtId: { $in: districtIds } })
        .toArray()
        .then(rows =>
          orderedFor(rows, districtIds, 'districtId', false)
        );
    },

    getPersonsByReportIds(reportIds) {
      const reportObjectIds = mapIdsToObjectIDs(reportIds);
      return mPool.collection('persons')
        .find({ reportIds: { $elemMatch: { $in: reportObjectIds } } })
        .toArray()
        .then(rows =>
          orderedFor(rows, reportObjectIds, 'reportIds', true)
        );
    },

    getAllPersons(skip = 0) {
      return mPool.collection('persons')
        .find({}, { skip })
        .toArray()
        .then(rows =>
          rows
        );
    },

    getRiskAveragesByDistrictIds(districtIds) {
      return mPool.collection('assessments')
        .find({ districtId: { $in: districtIds } }, { scores: 1, districtId: 1 })
        .toArray()
        .then(rows =>
          orderedForAverage(rows, districtIds, 'districtId')
        );
    },

    getAssessmentsByPersonIds(personIds) {
      const personObjectIds = mapIdsToObjectIDs(personIds);
      return mPool.collection('assessments')
        .find({ personId: { $in: personIds } })
        .toArray()
        .then(rows =>
          orderedFor(rows, personObjectIds, 'personId', false)
        );
    }
  };
}
