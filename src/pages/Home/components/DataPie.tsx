import React, { useEffect } from 'react';
import { Pie } from '@antv/g2plot';

interface valueType {
  type: string;
  value: number;
}

export interface PieDataType {
  value: Array<valueType>;
  elementId: string;
  title?: string;
  description?: string;
}

interface DataPieProps {
  data: PieDataType;
}

const DataPie: React.FC<DataPieProps> = ({ data }) => {
  useEffect(() => {
    const piePlot = new Pie(document.getElementById(data.elementId), {
      forceFit: true,
      title: {
        visible: true,
        text: data.title || '饼图',
      },
      description: {
        visible: true,
        text: data.description || null,
      },
      radius: 0.8,
      data: data.value,
      angleField: 'value',
      colorField: 'type',
      label: {
        visible: true,
        type: 'inner',
      },
    });
    piePlot.render();
  }, []);
  return <div id={data.elementId}></div>;
};
export default DataPie;
