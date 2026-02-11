const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function getToken() {
  return localStorage.getItem('token');
}

function getHeaders(includeAuth = true) {
  const headers = { 'Content-Type': 'application/json' };
  if (includeAuth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

async function request(path, options = {}) {
  const url = `${API_URL}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: getHeaders(options.skipAuth ?? false),
    ...(options.body && typeof options.body === 'object' && !(options.body instanceof FormData)
      ? { body: JSON.stringify(options.body) }
      : {}),
  });
  const data = res.ok ? await res.json().catch(() => ({})) : await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || res.statusText || 'Request failed');
  return data;
}

export const api = {
  auth: {
    register: (email, password) => request('/auth/register', { method: 'POST', body: { email, password }, skipAuth: true }),
    login: (email, password) => request('/auth/login', { method: 'POST', body: { email, password }, skipAuth: true }),
  },
  links: {
    list: (params = {}) => {
      const q = new URLSearchParams(params).toString();
      return request(`/links${q ? `?${q}` : ''}`);
    },
    get: (id) => request(`/links/${id}`),
    create: (url, title, tags) => request('/links', { method: 'POST', body: { url, title, tags } }),
    update: (id, body) => request(`/links/${id}`, { method: 'PUT', body }),
    delete: (id) => request(`/links/${id}`, { method: 'DELETE' }).then(() => {}),
  },
};
export { getToken };
