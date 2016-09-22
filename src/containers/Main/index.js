import React, { Component, PropTypes } from 'react';
import { compact } from 'lodash';

import App from 'grommet/components/App';
import Split from 'grommet/components/Split';

import SideBarNav from '../../components/SideBarNav';

class Main extends Component {
  render() {
    const { 
      children,
      route: { 
        childRoutes,
        path,
      }
    } = this.props;
    const navLabels = {
      dashboard: 'Population View',
      'risk-score': 'Risk Score',
    };
    const routes = () => {
      if (!childRoutes) return [];
      return compact(childRoutes.map(({path}) => {
        const label =  navLabels[path];
        const route = `/${path}`;
        const link  = {label, route};
        return label ? {...link, isDisabled: true} : false;
      }));
    };
    return (
      <App centered={false}>
        <Split
          inline={true}
          fixed={true}
          flex="right"
          priority="right">
 
          <SideBarNav routes={routes()} />

          {children}
        </Split>
      </App>
    );
  }
}

export default Main;
