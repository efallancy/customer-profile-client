import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.API_BASE_URL || 'http://localhost:4200'
});

export function constructUrlQuery(queryObject = {}) {
  return Object.keys(queryObject).reduce(
    (query, key) => {
      if (query) {
        query += `&${key}=${queryObject[key]}`;
      } else {
        query += `?${key}=${queryObject[key]}`;
      }

      return query;
    }, ''
  );
}

export default instance;
