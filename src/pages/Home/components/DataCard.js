import React from 'react';
import { Card, Icon } from 'antd';

import styles from './dataCard.less';

function DataCard({ icon, title, number }) {
  return (
    <Card className={styles.dataCard} bordered={false} bodyStyle={{ padding: 0 }}>
      <Icon className={styles.iconWarp} type={icon} />
      <div className={styles.content}>
        <p className={styles.title}>{title || 'No Title'}</p>
        <p className={styles.number}>{number}</p>
      </div>
    </Card>
  );
}

export default DataCard;
