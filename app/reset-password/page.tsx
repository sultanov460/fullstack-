"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import z from "zod";

export default function ResetPassword() {
  interface ErrorsState {
    otp: string | null;
    password: string | null;
    general: string | null;
  }

  const params = useSearchParams();
  const email = params.get("email");
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorsState>({
    otp: null,
    password: null,
    general: null,
  });

  const resetSchema = z.object({
    otp: z.string().min(6, "OTP must be 6 digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email) {
      setErrors({
        otp: null,
        password: null,
        general: "Invalid password reset link.",
      });
      return;
    }

    const result = resetSchema.safeParse({ otp, password });

    if (!result.success) {
      const { fieldErrors } = result.error.flatten();
      setErrors({
        otp: fieldErrors.otp?.[0] || null,
        password: fieldErrors.password?.[0] || null,
        general: null,
      });
      return;
    }

    setErrors({ otp: null, password: null, general: null });
    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password`,
        {
          email,
          otp,
          newPassword: password,
        },
        { withCredentials: true }
      );

      setSuccess(res.data.msg);

      setTimeout(() => {
        router.push("/login");
      }, 3000);

      // Reset fields only after successful request
      setOtp("");
      setPassword("");

    } catch (error: any) {
      const message =
        error.response?.data?.message || "Something went wrong, try again.";

      setErrors({
        otp: null,
        password: null,
        general: message,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-5 h-screen items-center text-primary justify-center">
      <h1 className="text-3xl text-center">Reset password</h1>
      <p>Enter the OTP sent to your email</p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-5"
      >
        <input
          type="text"
          name="otp"
          value={otp}
          disabled={loading}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="OTP code"
          className="border border-primary bg-transparent w-80 px-2 py-2.5 outline-none max-w-150 rounded-xl"
        />
        {errors.otp && <span className="text-red-500">{errors.otp}</span>}

        <input
          type="password"
          value={password}
          disabled={loading}
          className="border border-primary bg-transparent w-80 px-2 py-2.5 outline-none max-w-150 rounded-xl"
          placeholder="New password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password}</span>
        )}

        {success && <span className="text-green-500">{success}</span>}
        {errors.general && (
          <span className="text-red-500">{errors.general}</span>
        )}

        <button
          disabled={loading}
          className="bg-primary text-bg border py-2.5 w-80 px-5 font-semibold border-primary text-xl rounded-xl cursor-pointer hover:bg-transparent hover:text-primary transition duration-300"
        >
          {loading ? "Resetting..." : "Reset password"}
        </button>
      </form>
    </div>
  );
}