"use client";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { useAuth } from "@/context/authContext";
export default function ProfilePage() {
  const { user } = useAuth();
  return (
    <ProtectedRoute>
      {" "}
      <div className=" flex flex-col gap-5 h-screen items-center justify-center text-primary">
        {" "}
        <h1 className="text-4xl text-primary text-center">Profile</h1>{" "}
        <div className=" text-2xl flex flex-col gap-5 border-2 p-10 rounded-2xl">
          {" "}
          <div className="flex gap-3">
            {" "}
            <h1 className="font-semibold">Name:</h1> <p>{user?.name}</p>{" "}
          </div>{" "}
          <div className="flex gap-3">
            {" "}
            <h1 className="font-semibold">Email:</h1> <p>{user?.email}</p>{" "}
          </div>{" "}
          <div className="flex gap-3">
            {" "}
            <h1 className="font-semibold">Registered:</h1>{" "}
            <p>{user?.createdAt.slice(0, 10)}</p>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </ProtectedRoute>
  );
}
