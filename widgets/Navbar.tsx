"use client";
import Link from "next/link";
import { useAuth } from "@/context/authContext";
import Container from "@/components/Container";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <div className="border-b border-primary text-primary">
      <Container className="flex justify-between  items-center  py-2.5">
        <Link
          href={"/"}
          className="text-2xl font-bold text-primary cursor-pointer"
        >
          Cyberpunk
        </Link>
        {user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link
            href={"/login"}
            className="px-5 py-2 bg-primary border border-primary text-bg  cursor-pointer rounded-xl text-lg font-semibold hover:bg-transparent hover:text-primary transition duration-300"
          >
            Log In
          </Link>
        )}
      </Container>
    </div>
  );
};

export default Navbar;
