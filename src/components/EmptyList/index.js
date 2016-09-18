import React, { PropTypes } from 'react';

import Heading from 'grommet/components/Heading';
import Box from 'grommet/components/Box';

// import EmptyIcon from '../../empty';

const EmptyList = () => {
  return (
    <Box size="medium">
      <Heading
        data-testref="primary-heading"
        align="center"
        margin="none"
        strong={true}
        tag="h4">
        A List of Homeless Records
      </Heading>
      <Heading
        data-testref="secondary-heading"
        align="center"
        tag="h4"
        margin="none">
        No Records Found
      </Heading>
      <Box
        data-testref="image"
        pad={{horizontal: 'large'}}
        align="center">
        {/*<EmptyIcon />*/}
      </Box>
    </Box>
  );
};

export default EmptyList;
