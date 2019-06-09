import React from 'react';
import { Layout } from 'antd';
import { Redirect, Route, Switch } from 'react-router-dom';
import Overview from '../Overview';
import Liquidity from '../Liquidity';
import Menu from '../Menu';
import LimitSelect from '../LimitSelect';
import styles from './index.scss';

const { Header, Content } = Layout;

function Main({
  data = [],
  loading = false,
  changeLimit,
  limit,
}) {
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <h1>Hasty.ai challenge</h1>
      </Header>
      <Layout>
        <Menu />
        <Content className={styles.content}>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Overview
                  data={data}
                  loading={loading}
                  extra={<LimitSelect onChange={changeLimit} currentValue={limit} />}
                />
              )}
            />
            <Route
              exact
              path="/liquidity"
              render={() => (
                <Liquidity
                  data={data}
                  loading={loading}
                  extra={<LimitSelect onChange={changeLimit} currentValue={limit} />}
                />
              )}
            />
            <Redirect to="/" />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Main;
