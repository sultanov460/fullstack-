'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";

const VerifyEmailPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [status, setStatus] = useState<string>('Verifying...');

  const { setToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!email || !token) {
      setStatus('Invalid verification link.');
      return;
    }

    const verifyUser = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, token }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('Email verified successfully!');
        setToken(data.token);
        router.push('/');
      }
      else setStatus(data.error || 'Verification failed.');
    }

    verifyUser()

  }, [token, email]);



  return (
    <div className="h-screen flex items-center justify-center">
      <h1 className="text-primary text-5xl font-semibold">
        {status}
      </h1>
    </div>
  );
};

export default VerifyEmailPage;
