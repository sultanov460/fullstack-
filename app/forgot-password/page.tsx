"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`,
        { email }
      );

      setStatus(res.data.msg);

      setTimeout(() => {
        router.push(`/reset-password?email=${email}`);
      }, 2000);
    } catch (err: any) {
      setError(err?.response?.data?.message);
      console.log("Error:", err);
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
        {status && <span className="text-green-500">{status}</span>}
        {error && <span className="text-red-500">{error}</span>}
        <button className="bg-primary text-bg border py-2.5 w-80 px-5 font-semibold border-primary text-xl rounded-xl cursor-pointer hover:bg-transparent hover:text-primary transition duration-300">
          Send
        </button>
      </form>
    </div>
  );
}
