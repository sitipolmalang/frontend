"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function AuthCallbackPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const login = searchParams.get("login");

  const [userInfo, setUserInfo] = useState<string>("");
  const [fetchError, setFetchError] = useState<string>("");
  const [logoutMessage, setLogoutMessage] = useState<string>("");

  const apiBaseUrl = useMemo(
    () => process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000",
    []
  );

  useEffect(() => {
    if (error) {
      return;
    }

    fetch(`${apiBaseUrl}/api/me`, {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Gagal mengambil profil.");
        }

        const data = await response.json();
        setUserInfo(JSON.stringify(data, null, 2));
      })
      .catch((fetchError: unknown) => {
        const message =
          fetchError instanceof Error ? fetchError.message : "Unknown error";
        setFetchError(message);
      });
  }, [apiBaseUrl, error, login]);

  const handleLogout = async () => {
    setLogoutMessage("");

    const response = await fetch(`${apiBaseUrl}/api/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      setLogoutMessage("Logout gagal.");
      return;
    }

    setUserInfo("");
    setFetchError("");
    setLogoutMessage("Logout berhasil.");
  };

  const status = useMemo(() => {
    if (error) {
      return `Login gagal: ${error}`;
    }

    if (fetchError) {
      return `Login berhasil, tapi sesi tidak valid: ${fetchError}`;
    }

    if (userInfo) {
      return "Login berhasil dan data user diambil dari cookie httpOnly.";
    }

    return "Memproses login...";
  }, [error, fetchError, userInfo]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 p-6">
      <main className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-semibold text-zinc-900">Auth Callback</h1>
        <p className="mt-3 text-sm text-zinc-700">{status}</p>
        {userInfo ? (
          <pre className="mt-4 overflow-x-auto rounded-lg bg-zinc-950 p-4 text-xs text-zinc-100">
            {userInfo}
          </pre>
        ) : null}
        {userInfo ? (
          <button
            type="button"
            onClick={handleLogout}
            className="mt-4 inline-flex rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
          >
            Logout
          </button>
        ) : null}
        {logoutMessage ? (
          <p className="mt-3 text-sm text-zinc-700">{logoutMessage}</p>
        ) : null}
        {userInfo ? (
          <Link
            href="/profile"
            className="mt-3 inline-flex rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-100"
          >
            Lanjut ke Profile
          </Link>
        ) : null}
        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
        >
          Kembali ke Home
        </Link>
      </main>
    </div>
  );
}
