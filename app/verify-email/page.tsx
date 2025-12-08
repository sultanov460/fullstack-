"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const VerifyEmailPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [status, setStatus] = useState<string>("Verifying...");

  const router = useRouter();

  useEffect(() => {
    if (!email || !token) {
      setStatus("Invalid verification link.");
      return;
    }

    const verifyUser = async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-email`,
        {
          email,
          token,
        },
        {
          withCredentials: true,
        }
      );

      const data = res.data;

      if (data) {
        setStatus("Email verified successfully!");

        router.push("/");
      } else setStatus(data.error || "Verification failed.");
    };

    verifyUser();
  }, [token, email]);

  return (
    <div className="h-screen flex items-center justify-center">
      <h1 className="text-primary text-5xl font-semibold">{status}</h1>
    </div>
  );
};

export default VerifyEmailPage;
