import { Button, InputNumber, Space } from 'antd';
import { SwapRightOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

interface ANumberRangeInputProps {
  min?: number;
  max?: number;
  value?: Array<number | null | undefined> | undefined;
  onChange?: (value: any) => void;
}

export function ANumberRangeInput(props: ANumberRangeInputProps) {
  const start = props.value?.[0] || null;
  const end = props.value?.[1] || null;

  function setRange(start?: number | null, end?: number | null) {
    props.onChange?.([start, end]);
  }

  return (
    <Space.Compact block>
      <InputNumber
        min={props.min}
        max={props.max}
        style={{ width: '100%' }}
        value={start}
        onChange={(val) => setRange(val, end)}
      />
      <Button
        disabled
        style={{ cursor: 'unset' }}
        icon={<SwapRightOutlined />}
      />
      <InputNumber
        min={props.min}
        max={props.max}
        style={{ width: '100%' }}
        value={end}
        onChange={(val) => setRange(start, val)}
      />
    </Space.Compact>
  );
}
