import React from 'react';
import { Icon, Row, Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';

function MenuWrapper({ location }) {
  return (
    <Row>
      <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
        <Menu.Item key="/">
          <Link to={`/${location.search}`}>
            <Icon type="home" />
            <span>Overview</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="/liquidity">
          <Link to={`/liquidity${location.search}`}>
            <Icon type="dot-chart" />
            <span>Liquidity</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Row>
  );
}

export default withRouter(MenuWrapper);
