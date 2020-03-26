import { Table } from 'antd';

// interface DataType {
//     userName: string;
//     operation: string;
//     ipAddress: string;
//     time: string;
// }

function LoginLog({ loginInfo }) {
  const data = [];
  console.log(loginInfo, '1222134241');
  for (let i = 0; i < 10; i++) {
    console.log(loginInfo[i], '1222134241');
    let { logDescription, userName, ip, creatime } = loginInfo[i];
    data.push({
      userName: userName,
      operation: logDescription,
      ipAddress: ip,
      time: creatime,
    });
  }

  const columns = [
    {
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '操作',
      ataIndex: 'operation',
      key: 'operation',
    },
    {
      title: 'IP',
      dataIndex: 'ipAddress',
      key: 'ipAddress',
    },
    {
      title: '执行时间',
      dataIndex: 'time',
      key: 'time',
    },
  ];

  return <Table dataSource={data} columns={columns} />;
}

export default LoginLog;
