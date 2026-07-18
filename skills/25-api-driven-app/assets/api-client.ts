export type AppError = {
  code: string;
  message: string;
  status?: number;
  retryable: boolean;
  requestId?: string;
  details?: unknown;
};

export type ApiClientOptions = {
  baseUrl: string;
  getToken?: () => string | undefined | Promise<string | undefined>;
  timeoutMs?: number;
};

export class ApiClient {
  constructor(private readonly options: ApiClientOptions) {}

  async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.options.timeoutMs ?? 30_000);
    try {
      const token = await this.options.getToken?.();
      const res = await fetch(new URL(path, this.options.baseUrl), {
        ...init,
        signal: init.signal ?? controller.signal,
        headers: {
          'content-type': 'application/json',
          ...(token ? { authorization: `Bearer ${token}` } : {}),
          ...init.headers,
        },
      });
      if (!res.ok) throw await this.toError(res);
      return (await res.json()) as T;
    } catch (error) {
      throw this.normalizeError(error);
    } finally {
      clearTimeout(timeout);
    }
  }

  private async toError(res: Response): Promise<AppError> {
    const requestId = res.headers.get('x-request-id') ?? undefined;
    let details: unknown;
    try { details = await res.json(); } catch { details = undefined; }
    return {
      code: `HTTP_${res.status}`,
      message: res.statusText || 'Request failed',
      status: res.status,
      retryable: res.status >= 500 || res.status === 429,
      requestId,
      details,
    };
  }

  private normalizeError(error: unknown): AppError {
    if (typeof error === 'object' && error && 'code' in error) return error as AppError;
    if (error instanceof DOMException && error.name === 'AbortError') {
      return { code: 'REQUEST_TIMEOUT', message: 'Request timed out', retryable: true };
    }
    return { code: 'UNKNOWN_ERROR', message: 'Unexpected request error', retryable: false, details: error };
  }
}
