type Payload = {
  headers: Record<string, any>,
  method: string,
  body?: any,
};

/**
 * api request
 *
 * @param method method
 * @param api api url
 * @param body body
 * @returns Promise
 */
const request = async (method: string, api: string, body: any = null): Promise<any> => {
  let url = `http://localhost:9989/api${api}`;

  if (method === 'GET' && body) {
    url += `?${new URLSearchParams(body)}`;
  }

  const payload: Payload = {
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
