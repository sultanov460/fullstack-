import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function ProfilePage() {
    return (
        <ProtectedRoute>
            <div>profile</div>
        </ProtectedRoute>
    )
}