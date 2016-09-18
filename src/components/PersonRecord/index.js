// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import StatusIcon from 'grommet/components/icons/Status';
import ListItem from 'grommet/components/ListItem';
import Box from 'grommet/components/Box';

const PersonRecord = ({
  index,
  item: {
    name,
    status
  }
}) =>
  <ListItem
    key={`activity-list-item-${index}`}
    className="activity-list-item"
    align="start"
    justify="between"
    separator="horizontal"
    onClick={() => browserHistory.push(`/risk-score/${age}`)}
    pad={{
      horizontal: 'large',
      vertical: 'medium',
      between: 'medium'
    }}>

    <Box
      direction="row"
      pad={{between: 'small'}}>
      <StatusIcon value={status} />
      <Box tag="span" pad={{horizontal: 'medium'}}>
        {name}
      </Box>
    </Box>

  </ListItem>;

export default PersonRecord;
