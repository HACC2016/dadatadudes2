// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

import React, { PropTypes } from 'react';
import FormField from 'grommet/components/FormField';
import LayerForm from 'grommet-templates/components/LayerForm';

const PersonDetailsLayer = ({onClose}) => {
  return (
    <LayerForm
      title="Details"
      compact={false}
      submitLabel="Ok"
      onSubmit={onClose}
      onClose={onClose}>

      <fieldset>    
        
      </fieldset>

    </LayerForm>
  );
};

export default PersonDetailsLayer;
