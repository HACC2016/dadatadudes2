// (C) Copyright 2016 Hewlett Packard Enterprise Development LP
import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';

import CloseIcon from 'grommet/components/icons/base/Close';

import Sidebar from 'grommet/components/Sidebar';
import Button from 'grommet/components/Button';
import Header from 'grommet/components/Header';
import Menu from 'grommet/components/Menu';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';

export const SidebarNav = ({routes}) =>
  <Sidebar
    full={true}
    size="small"
    className="dashboard-sidebar"
    colorIndex="neutral-1-a">
    <Box 
      justify="between" 
      direction="column" 
      full={true}>
      <Box direction="column">
        <Header
          justify="between"
          pad="medium">
          <Heading 
            tag="h3" 
            strong={true}
            uppercase={true}>
            Hawaii Homeless
          </Heading>
        </Header>

        <Menu
          pad={{vertical: 'small'}}
          align="start"
          direction="column"
          justify="between"
          primary={true}>

          {routes.map((route, i) =>
          <Link
            key={i}
            className="link grommetux-anchor"
            to={route.route}
            activeClassName="active">
            {route.label}
          </Link>
          )}
        </Menu>
        <Box pad="medium">
          <Button label="Logout" onClick={(e) => {
            e.preventDefault();
            localStorage.clear();
            window.location.assign('/login');; 
          }}/>
        </Box>
      </Box>

    </Box>
  </Sidebar>;

export default SidebarNav;
