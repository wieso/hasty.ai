import React from 'react';
import { Select } from 'antd';
import { SELECT_OPTIONS } from '../../constants';

const { Option } = Select;

function LimitSelect({ onChange, currentValue = '' }) {
  return (
    <div>
      <span>Limit: </span>
      <Select onChange={onChange} value={currentValue}>
        {SELECT_OPTIONS.map(option => <Option key={option.value} value={option.value}>{option.title}</Option>)}
      </Select>
    </div>
  );
}

export default LimitSelect;
