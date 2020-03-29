import request from '@/utils/request';

export async function getGoodsData(page: number) {
  const url = `/api/goods/?page=${page}&count=7`;
  return request(url, {
    method: 'GET',
  });
}

export async function getTagsData(page: number) {
  const url = `/api/tags/?page=${page}&count=3`;
  return request(url, {
    method: 'GET',
  });
}
