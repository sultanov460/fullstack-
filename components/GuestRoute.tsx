"use client";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

type GuestRoute = PropsWithChildren;

export const GuestRoute = ({ children }: GuestRoute) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  if (user) {
    return null;
  }

  return <>{children}</>;
};
