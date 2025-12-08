"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import z from "zod";

export default function ForgotPassword() {
  interface ErrorsState {
    email: string | null;
    general: string | null;
  }
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [errors, setErrors] = useState<ErrorsState>({
    email: null,
    general: null,
  });

  const loginSchema = z.email('Invalid email address');

  const router = useRouter();

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setStatus(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = loginSchema.safeParse(email);


    if (!result.success) {
      const flattened = z.flattenError(result.error);

      const formErrors = flattened.formErrors;
      console.log(formErrors);

      setErrors({
        email: formErrors[0] || null,
        general: null,
      });
      return;
    }

    setErrors({ email: null, general: null });

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`,
        { email }
      );

      setStatus(res.data.msg);

      setTimeout(() => {
        router.push(`/reset-password?email=${email}`);
      }, 2000);
    } catch (e: any) {
      if (e.response?.data?.message) {
        setErrors({ ...errors, general: e.response?.data?.message });
      } else {
        setErrors({ ...errors, general: "Something went wrong" });
      }
    }
    setEmail("");
  }

  return (
    <div className="flex flex-col gap-5 h-screen items-center text-primary justify-center">
      <h1 className="text-3xl text-center">Forgot password</h1>
      <p>Enter your email to reset your password</p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-5"
      >
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="border border-primary bg-transparent w-80 px-2 py-2.5  outline-none max-w-150 rounded-xl"
        />
        {errors.email && <span className="text-red-500"> {errors.email}</span>}
        {status && <span className="text-green-500">{status}</span>}
        {errors.general && (
          <span className="text-red-500">{errors.general}</span>
        )}
        <button className="bg-primary text-bg border py-2.5 w-80 px-5 font-semibold border-primary text-xl rounded-xl cursor-pointer hover:bg-transparent hover:text-primary transition duration-300">
          Send
        </button>
      </form>
    </div>
  );
}
