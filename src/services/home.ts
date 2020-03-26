import request from '@/utils/request';

export async function getCommonIndex() {
  return request('/api/common/index', {
    method: 'GET',
  });
}

export async function getUserData(id) {
  const url = `/api/user/role/${id}`;
  return request(url, {
    method: 'GET',
  });
}

export async function getLoginLog(page: number) {
  const url = `/api/operationLogs/?page=${page}&count=10`;
  return request(url, {
    method: 'GET',
  });
}
