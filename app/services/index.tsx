// service/apiServices/httpClient.ts

const BASE_URL = 'https://wms.foxai.com.vn:50000/b1s/v1';

const defaultHeaders = {
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json',
};

const handleResponse = async (response: Response) => {
  const data = await response.json();

  if (!response.ok) {
    const errorMessage = data?.error?.message?.value || 'API Error';
    throw new Error(errorMessage);
  }

  return data;
};

// ✅ GET hỗ trợ truyền session (cookie)
const get = async (endpoint: string, sessionId?: string, routeId?: string) => {
  const headers = {
    ...defaultHeaders,
    ...(sessionId &&
      routeId && {
        Cookie: `B1SESSION=${sessionId}; ROUTEID=${routeId}`,
      }),
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'GET',
    headers,
  });

  return handleResponse(response);
};

// ✅ POST hỗ trợ truyền session
const post = async (
  endpoint: string,
  data: any,
  sessionId?: string,
  routeId?: string,
) => {
  const headers = {
    ...defaultHeaders,
    ...(sessionId &&
      routeId && {
        Cookie: `B1SESSION=${sessionId}; ROUTEID=${routeId}`,
      }),
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });

  return handleResponse(response);
};

const put = async (
  endpoint: string,
  data: any,
  sessionId?: string,
  routeId?: string,
) => {
  const headers = {
    ...defaultHeaders,
    ...(sessionId &&
      routeId && {
        Cookie: `B1SESSION=${sessionId}; ROUTEID=${routeId}`,
      }),
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  });

  return handleResponse(response);
};

export const HttpClient = {
  get,
  post,
  put,
};
