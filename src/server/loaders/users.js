import { aql } from 'arangojs';
import _ from 'lodash';

export default function userLoader(adb) {
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
    getUsersByIds(userIds) {
      return adb.query(aql`
        FOR user IN users
        FILTER ${userIds} ANY == user._key
        RETURN user
      `)
      .then(cursor => cursor.all())
      .then(vals => orderedFor(vals, userIds, '_key'));
    }
  };
}
