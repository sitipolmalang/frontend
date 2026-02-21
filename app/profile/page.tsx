"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const apiBaseUrl = useMemo(
    () => process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000",
    []
  );

  const [status, setStatus] = useState("Memuat profil...");
  const [userInfo, setUserInfo] = useState<string>("");

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/me`, {
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Sesi tidak valid.");
        }

        const data = await response.json();
        setUserInfo(JSON.stringify(data, null, 2));
        setStatus("Profil berhasil dimuat.");
      })
      .catch(() => {
        setStatus("Sesi tidak valid.");
      });
  }, [apiBaseUrl]);

  const handleLogout = async () => {
    const response = await fetch(`${apiBaseUrl}/api/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      setStatus("Logout gagal.");
      return;
    }

    router.push("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 p-6">
      <main className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-semibold text-zinc-900">Profile</h1>
        <p className="mt-3 text-sm text-zinc-700">{status}</p>
        {userInfo ? (
          <pre className="mt-4 overflow-x-auto rounded-lg bg-zinc-950 p-4 text-xs text-zinc-100">
            {userInfo}
          </pre>
        ) : null}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
          >
            Logout
          </button>
          <Link
            href="/"
            className="inline-flex rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
          >
            Home
          </Link>
        </div>
      </main>
    </div>
  );
}
