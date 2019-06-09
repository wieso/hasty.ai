import React from 'react';
import { Card, Table } from 'antd';
import styles from './index.scss';
import { formatter } from '../../utils';

const columns = [
  {
    title: 'Rank',
    dataIndex: 'cmcRank',
    key: 'cmcRank',
    sorter: (a, b) => a.cmcRank - b.cmcRank,
    defaultSortOrder: 'ascend',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: val => <span>{formatter.format(val)}</span>,
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Price Change (24h)',
    dataIndex: 'priceChange24',
    key: 'priceChange24',
    render: val => (
      <span>
        {val} % {/* eslint-disable-line */}
      </span>
    ),
    sorter: (a, b) => a.priceChange24 - b.priceChange24,
  },
  {
    title: 'Market Cap',
    dataIndex: 'marketCap',
    key: 'marketCap',
    render: val => <span>{formatter.format(val)}</span>,
    sorter: (a, b) => a.marketCap - b.marketCap,
  },
  {
    title: 'Volume (24h)',
    dataIndex: 'volume24',
    key: 'volume24',
    render: val => <span>{formatter.format(val)}</span>,
    sorter: (a, b) => a.volume24 - b.volume24,
  },
];

function Overview({ data, loading, extra }) {
  return (
    <Card title="Overview" className={styles.overview} extra={extra}>
      <div className={styles.contentWrapper}>
        <Table
          rowKey="id"
          dataSource={data}
          columns={columns}
          loading={loading}
        />
      </div>
    </Card>
  );
}

export default Overview;
