import _ from 'lodash';

export default function mdbConstructor(mPool) {
  const orderedFor = (vals, collection, field, single = true) => {
    const inGroupsOfField = _.groupBy(vals, field);

    return collection.map(element => {
      const elementArray = inGroupsOfField[element];
      if (elementArray) {
        return single ? elementArray[0] : elementArray;
      }

      return single ? {} : [];
    });
  };

  return {
    getUsersByEmails(emails) {
      return mPool.collection('users')
        .find({ email: { $in: emails } })
        .toArray()
        .then(rows =>
          orderedFor(rows, emails, 'email')
        );
    },

    getDistrictsByIds(districtIds) {
      return mPool.collection('districts')
        .find({ districtId: { $in: districtIds } })
        .toArray()
        .then(rows =>
          orderedFor(rows, districtIds, 'districtId')
        );
    }
  };
}
