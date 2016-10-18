import request from '../utils/request';

export function fetchList() {
  return request('/api/users');
}
