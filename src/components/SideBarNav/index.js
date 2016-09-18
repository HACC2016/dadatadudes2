// (C) Copyright 2016 Hewlett Packard Enterprise Development LP
import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { buildInfo } from 'utils';
import has from 'lodash/has';

import CloseIcon from 'grommet/components/icons/base/Close';

import Sidebar from 'grommet/components/Sidebar';
import Button from 'grommet/components/Button';
import Header from 'grommet/components/Header';
import Menu from 'grommet/components/Menu';
import Box from 'grommet/components/Box';

export const SidebarNav = ({routes}) =>
  <Sidebar
    full={true}
    className="dashboard-sidebar"
    colorIndex="neutral-1">
    <Box justify="between" direction="column" full={true}>
      <Box direction="column">
        <Header
          justify="between"
          pad="medium">

        </Header>

        <Menu
          pad={{vertical: 'small'}}
          align="start"
          direction="column"
          justify="between"
          primary={true}>

          { /*routes.map((route, index) =>
            has(route, 'isDisabled') && route.isDisabled?
              <a key={index} className="link" href="#">
                {intl.formatMessage(route.label)}
              </a>
            :
              <Link
                key={index}
                className="link grommetux-anchor"
                to={route.route}
                activeClassName="active">
                {intl.formatMessage(route.label)}
              </Link>
          ) */}
        </Menu>
      </Box>

    </Box>
  </Sidebar>;

export default SidebarNav;
