/**
 * api request
 *
 * @param {string} method method
 * @param {string} api api url
 * @param {object} body body
 * @returns {Promise} Promise
 */
const request = async (method, api, body = null) => {
  let url = `http://localhost:9989/api${api}`;

  if (method === 'GET' && body) {
    url += `?${new URLSearchParams(body)}`;
  }

  const payload = {
    headers: {
      'Content-type': 'application/json',
    },
    method,
  };

  if (method !== 'GET' && body) {
    payload.body = JSON.stringify(body);
  }

  return fetch(url, payload).then((res) => res.json());
};

export default request;
