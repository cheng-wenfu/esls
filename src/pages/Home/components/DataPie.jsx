import React, { useEffect } from 'react';
import { Pie } from '@antv/g2plot';

// interface valueType {
//     type: string;
//     value: number;
// }

// interface dataType {
//     value: Array<valueType>
//     title?: string;
//     description?: string;
// }

export default function DataPie({ data }) {
  console.log(data);
  useEffect(() => {
    const piePlot = new Pie(document.getElementById(data.elementId), {
      forceFit: true,
      title: {
        visible: true,
        text: data.title || '饼图',
      },
      description: {
        visible: true,
        text: 'test',
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
}
