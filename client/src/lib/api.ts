// The only place that calls fetch. Throws Error with the server's message on failure.
export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`/api${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  });
  const body = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(body?.error?.message ?? 'Request failed');
  }
  return body as T;
}
