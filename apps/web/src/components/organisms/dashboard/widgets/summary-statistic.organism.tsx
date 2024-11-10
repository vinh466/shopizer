import { useTheme } from '@shopizer/hooks';
import { Card, Statistic } from 'antd';
import Link from 'next/link';
import React from 'react';

interface OGSummaryStatisticProps {
  title: string;
  value: string;
  href?: string;
}

export default function OGSummaryStatistic(props: OGSummaryStatisticProps) {
  const { theme } = useTheme();

  return (
    <Link href={props.href || '#'}>
      <Card bordered={false} className="statistic-card">
        <Statistic title={props.title} value={props.value} />

        <style jsx global>{`
          .sales-dashboard {
            .statistic-card {
              text-align: center;
              cursor: pointer;
              box-shadow: none;
              .ant-statistic-title {
                font-size: 14px;
                font-weight: 500;
                color: ${theme === 'dark' ? '#ffffff' : '#000000d9'};
              }
              &:hover {
                background-color: ${theme === 'dark'
                  ? '#ffffff1d'
                  : '#7b7b7b1d'};
              }
              &:active {
                user-select: none;
                opacity: 0.8;
              }
            }

            .ant-statistic-title {
              white-space: nowrap;
            }
          }
        `}</style>
      </Card>
    </Link>
  );
}
