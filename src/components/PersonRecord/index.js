// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import StatusIcon from 'grommet/components/icons/Status';
import ListItem from 'grommet/components/ListItem';
import Box from 'grommet/components/Box';

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
  <ListItem
    key={`activity-list-item-${index}`}
    className="activity-list-item"
    justify="between"
    separator="horizontal"
    onClick={() => openLayer(_id, assessmentIds)}
    pad={{
      horizontal: 'large',
      vertical: 'medium',
      between: 'medium'
    }}>

    <Box
      justify="between"
      direction="row"
      >
      <StatusIcon value={assessmentIds ? 'ok' : 'critical'} />
      <Box tag="span" pad={{horizontal: 'medium'}}>
        {`Name: ${firstName} ${lastName}`}
      </Box>
    </Box>

    <Box tag="span" pad={{horizontal: 'medium'}}>
      {`Age: ${age}`}
    </Box>

    <Box tag="span" pad={{horizontal: 'medium'}}>
      {`Gender: ${gender}`}
    </Box>

    <Box tag="span" pad={{horizontal: 'medium'}}>
      {`Ethnicity: ${ethnicity}`}
    </Box>
    <Box tag="span" pad={{horizontal: 'medium'}}>
      {`Currently Employed: ${employmentStatus}`}
    </Box>

    <Box tag="span" pad={{horizontal: 'medium'}}>
      {`Children: ${(familyMembersChildren)}`}
    </Box>

    <Box>
      {`District: ${districtId}`}
    </Box>

  </ListItem>;

export default PersonRecord;
