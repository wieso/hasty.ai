import React from 'react';
import { Card, Spin } from 'antd';
import {
  ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis,
} from 'recharts';
import styles from './index.scss';
import { formatter } from '../../utils';

const cardBodyStyle = { height: '100%' };
const styleTooltip = { width: 300 };

function prepareData(data = []) {
  const chartData = [];
  const k = 10; // for more visible bubbles
  let minZ = Number.MAX_SAFE_INTEGER;
  let maxZ = 0;

  // needing data calculation in one loop
  data.forEach((item) => {
    chartData.push({
      name: item.name,
      x: item.marketCap,
      y: item.volume24,
      z: Math.abs(item.priceChange24),
    });
    if (minZ > Math.abs(item.priceChange24)) minZ = Math.abs(item.priceChange24);
    if (maxZ < Math.abs(item.priceChange24)) maxZ = Math.abs(item.priceChange24);
  });

  return {
    data: chartData,
    range: [minZ / k, maxZ * k],
  };
}

function CustomTooltip({ active, payload }) {
  if (active) {
    return (
      <Card size="small" title={payload[0].payload.name} style={styleTooltip}>
        {payload.map(item => (
          <p key={item.name}>
            {item.name}: {item.unit === '$' ? formatter.format(item.value) : `${item.value}${item.unit}` /* eslint-disable-line */}
          </p>
        ))}
      </Card>
    );
  }
  return null;
}

function Liquidity({ data = [], loading = false, extra }) {
  const preparedData = prepareData(data);
  return (
    <Card title="Liquidity" className={styles.liquidity} bodyStyle={cardBodyStyle} extra={extra}>
      <div className={styles.contentWrapper}>
        {loading && <Spin />}
        <ResponsiveContainer height="90%">
          <ScatterChart>
            <XAxis
              dataKey="x"
              name="Market Capitalization"
              type="number"
              unit="$"
              tick={false}
              label={{ value: 'Market Capitalization', offset: 0, position: 'insideBottom' }}
            />
            <YAxis
              dataKey="y"
              name="Volume (24h)"
              type="number"
              unit="$"
              tick={false}
              label={{
                value: 'Volume (24h)', angle: -90, offset: 0, position: 'insideLeft',
              }}
            />
            <ZAxis dataKey="z" range={preparedData.range} name="Absolute price change (24h)" unit="%" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
            <Scatter name="Liquidity" data={preparedData.data} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default Liquidity;
