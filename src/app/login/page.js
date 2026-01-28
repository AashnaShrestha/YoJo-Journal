"use client";
import { InputField } from "@/components/InputField";
import { Btn } from "@/components/Button";
import { login } from "@/client/auth.api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";

export default function Signup() {
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      await login(data);
      router.replace("/journal");
    } catch (err) {
      setErrors(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="flex w-[30vw] flex-col gap-6 rounded-xl bg-white px-16 py-16 shadow-lg">
        <h1 className="text-3xl font-semibold">Login</h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <InputField name="email" label="Email" />

          <InputField name="password" label="Password" type="password" />

          <Btn btnLabel="Login" theme="dark" type="submit" />
        </form>

        <p>
          Do not have an account yet? <a href="/signup">Signup</a>
        </p>
      </main>
    </div>
  );
}
