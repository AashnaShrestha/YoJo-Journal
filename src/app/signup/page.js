"use client";
import { InputField } from "@/components/InputField";
import { Btn } from "@/components/Button";
import { signup } from "@/client/auth.api";
import { signupSchema } from "@/utils/validationSchema";
import { useState } from "react";

export default function Signup() {
  const [errors, setErrors] = useState({});

  const handleFieldChange = (e) => {
    const { name } = e.target;

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      await signupSchema.validate(data, { abortEarly: false });

      setErrors({});
      await signup(data);
    } catch (err) {
      if (err.name === "ValidationError") {
        const fieldErrors = {};
        err.inner.forEach((error) => {
          fieldErrors[error.path] = error.message;
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="flex w-[30vw] flex-col gap-6 rounded-xl bg-white px-16 py-16 shadow-lg">
        <h1 className="text-3xl font-semibold">Signup</h1>

        <form onSubmit={handleSignup} className="flex flex-col gap-6">
          <InputField
            name="name"
            label="Username"
            error={errors.name}
            onChange={handleFieldChange}
          />

          <InputField
            name="email"
            label="Email"
            error={errors.email}
            onChange={handleFieldChange}
          />

          <InputField
            name="password"
            label="Password"
            type="password"
            error={errors.password}
            onChange={handleFieldChange}
          />

          <InputField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            error={errors.confirmPassword}
            onChange={handleFieldChange}
          />

          <Btn btnLabel="Signup" theme="dark" type="submit" />
        </form>

        <p>
          Have an account? <a href="/login">Login</a>
        </p>
      </main>
    </div>
  );
}
