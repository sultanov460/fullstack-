'use client'
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react"

type ProtectedRouteProps = PropsWithChildren

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router])

    if (!user) {
        return null;
    }

    return <>{children}</>
}