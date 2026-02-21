import { getApiBaseUrl } from "@/lib/env";

export async function hasValidSession(token: string | undefined): Promise<boolean> {
  if (!token) {
    return false;
  }

  try {
    const response = await fetch(`${getApiBaseUrl()}/api/auth/session`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    return response.ok;
  } catch {
    return false;
  }
}
