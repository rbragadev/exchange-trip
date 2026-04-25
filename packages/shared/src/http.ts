export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type ApiResponse<T> = {
  data: T;
};

export interface ApiRequestOptions {
  method?: HttpMethod;
  body?: unknown;
  headers?: HeadersInit;
}

export async function requestJson<T>(baseUrl: string, path: string, options: ApiRequestOptions = {}): Promise<T> {
  const { method = 'GET', body, headers = {} } = options;
  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const message = await response.text().catch(() => 'Request failed');
    throw new Error(`Request failed (${response.status}): ${message}`);
  }

  const data = (await response.json()) as T;
  return data;
}

export interface HealthPayload {
  status: 'ok';
  service: string;
  timestamp: string;
}

export interface AppInfoPayload {
  name: string;
  environment: string;
  version: string;
}
