import _ from 'lodash';

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

  return {
    getUsersByEmails(emails) {
      return mPool.collection('users')
        .find({ email: { $in: emails } })
        .toArray()
        .then(rows =>
          orderedFor(rows, emails, 'email', true)
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

    getReportsByDistrictIds(districtIds) {
      return mPool.collection('reports')
        .find({ districtId: { $in: districtIds } })
        .toArray()
        .then(rows =>
          orderedFor(rows, districtIds, 'districtId', false)
        );
    },

    getPersonsByReportIds(reportIds) {
      return mPool.collection('persons')
        .find({ reportIds: { $elemMatch: { $in: reportIds } } })
        .toArray()
        .then(rows =>
          orderedFor(rows, reportIds, 'reportIds', false)
        );
    }
  };
}
