import request from '@/utils/request';

export async function getTagsIndex() {
  const url = '/api/tags/index';
  return request(url, {
    method: 'GET',
  });
}


interface TagsDataRequestParams {
  query: "waitUpdate" | "forbidState" | "";
  queryString: 1 | 0 | "";
  page: number;
}

export async function getTagsData({query, queryString, page,}: TagsDataRequestParams) {
  const url = `/api/tags/?query=${query}&queryString=${queryString}&page=${page}&count=10`;
  return request(url, {
    method: 'GET',
  })
}

export async function getchangePriceOvertime(page: number) {
  const url = `/api/tags/overtime?page=${page}$count=10`;
  return request(url, {
    method: 'GET',
  })
}
