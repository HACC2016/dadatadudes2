// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import StatusIcon from 'grommet/components/icons/Status';
import ListItem from 'grommet/components/ListItem';
import Box from 'grommet/components/Box';
import TableRow from 'grommet/components/TableRow';

const PersonRecord = ({
  index,
  item: {
    _id,
    firstName,
    lastName,
    assessmentIds,
    age,
    gender,
    ethnicity,
    employmentStatus,
    familyMembersChildren,
    districtId,
    openLayer
  }
}) =>
    <TableRow
      key={`activity-list-item-${index}`}
      onClick={() => openLayer(_id, assessmentIds)}>

      <td>
        <StatusIcon value={assessmentIds ? 'ok' : 'critical'} />
      </td>

      <td>
        {`${firstName} ${lastName}`}
      </td>

      <td>
        {age}
      </td>

      <td>
        {gender}
      </td>

      <td>
        {ethnicity}
      </td>

      <td>
        {employmentStatus ? 'Employed' : 'Unemployed'}
      </td>

      <td>
        {districtId}
      </td>

    </TableRow>;

export default PersonRecord;
