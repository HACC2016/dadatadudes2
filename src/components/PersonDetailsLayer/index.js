// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { PropTypes } from 'react';
import FormField from 'grommet/components/FormField';
import LayerForm from 'grommet-templates/components/LayerForm';
import Box from 'grommet/components/Box';
import Meter from 'grommet/components/Meter';
import Header from 'grommet/components/Header';
import Heading from 'grommet/components/Heading';
import Value from 'grommet/components/Value';
import TaskIcon from 'grommet/components/icons/base/Task';
import HistoryIcon from 'grommet/components/icons/base/History';
import DocumentIcon from 'grommet/components/icons/base/Document';
import RiskIcon from 'grommet/components/icons/base/Risk';
import GroupIcon from 'grommet/components/icons/base/Group';

const PersonDetailsLayer = ({
  onClose, 
  riskScore, 
  personDetails: {
    firstName,
    lastName
  }
}) => {
  return (
    <LayerForm
      title={`${firstName} ${lastName}`}
      compact={false}
      submitLabel="Ok"
      onSubmit={onClose}
      onClose={onClose}>

      <Box justify="center" align="center"> 
        <Heading tag="h5">Risk Score</Heading>
        <Meter 
          max={17} 
          min={0} 
          type="arc" 
          value={11}
          thresholds={[
            {value: 5, label: 'Ok', colorIndex: 'ok'},
            {value: 10, label: 'Warning', colorIndex: 'warning'},
            {value: 15, label: 'Critical', colorIndex: 'critical'},
          ]}/>
      </Box>
      <Box
        direction="row" 
        justify="between">
        <Value label="Pre-Survey" value={1} icon={<DocumentIcon />} />
        <Value label="History" value={2} icon={<HistoryIcon />} />
      </Box>

      <Box 
        direction="row" 
        justify="between">
        <Value label="Risks" value={2} icon={<RiskIcon />} />
        <Value label="Social & Daily" value={3} icon={<GroupIcon />} />
        <Value label="Wellness" value={3} icon={<TaskIcon />} />
      </Box>

    </LayerForm>
  );
};

export default PersonDetailsLayer;
