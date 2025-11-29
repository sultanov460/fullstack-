"use client";
import clsx from "clsx";
import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import { z } from "zod";
import axios from "axios";
import { useAuth } from "../context/registerContext";

interface ErrorsState {
  name: string | null;
  email: string | null;
  password: string | null;
}

type FormDataState = z.infer<typeof registerSchema>;

const registerSchema = z.object({
  name: z.string().min(2, "Name should be more than 2 lecters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const RegisterPage = () => {
  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<ErrorsState>({
    name: null,
    email: null,
    password: null,
  });

  const { token, setToken } = useAuth();
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    setErrors({ ...errors, [e.target.name]: null });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = registerSchema.safeParse(formData);

    if (!result.success) {
      const flattened = z.flattenError(result.error);

      const fieldErrors = flattened.fieldErrors;

      setErrors({
        name: fieldErrors.name?.[0] || null,
        email: fieldErrors.email?.[0] || null,
        password: fieldErrors.password?.[0] || null,
      });
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          ...formData,
        }
      );
      console.log(res.data);
      setFormData({ name: "", email: "", password: "" });
      setToken(res.data.token);
      console.log(res.data);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="flex flex-col gap-5 h-screen items-center justify-center">
      <h1 className="text-3xl text-primary text-center">
        Log in to your account
      </h1>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-1 text-primary">
          <span className="text-primary text-xl font-semibold">Name</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className={clsx(
              "border border-primary bg-transparent text-primary px-2 py-2.5 outline-none max-w-150 rounded-xl",
              errors.password && "!border-red-500"
            )}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name}</span>
          )}
        </label>
        <label className="flex flex-col gap-1 text-primary">
          <span className="text-primary text-xl font-semibold">Email</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={clsx(
              "border border-primary bg-transparent text-primary px-2 py-2.5 outline-none max-w-150 rounded-xl",
              errors.password && "!border-red-500"
            )}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email}</span>
          )}
        </label>
        <label className="flex flex-col gap-1 text-primary">
          <span className="text-primary text-xl font-semibold">Password</span>
          <input
            type="password"
            placeholder="******"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={clsx(
              "border border-primary bg-transparent text-primary px-2 py-2.5 outline-none max-w-150 rounded-xl",
              errors.password && "!border-red-500"
            )}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password}</span>
          )}
        </label>
        <button className="bg-primary text-bg border py-2.5 font-semibold border-primary text-xl rounded-xl cursor-pointer hover:bg-transparent hover:text-primary transition duration-300">
          Register
        </button>
        <h5 className="text-xl text-white ">
          Already have an account?{" "}
          <Link
            href={"/login"}
            className="text-primary hover:underline transition duration-300"
          >
            Log in
          </Link>
        </h5>
      </form>
    </div>
  );
};

export default RegisterPage;
