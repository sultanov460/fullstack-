import { PropsWithChildren } from "react";
import { AuthProvider } from "@/context/authContext";

type ProviderProps = PropsWithChildren

export default function Providers({ children }: ProviderProps) {
    return <>
        <AuthProvider>
            {children}
        </AuthProvider>
    </>;
}