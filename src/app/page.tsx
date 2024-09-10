"use client";
import { AuthContext } from "@/components/Context/AuthContext";
import HomePage from "@/components/HomePage";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function Page() {
  const { currentUser }: any = useContext(AuthContext);
  const NevigateToLoginPage = useRouter();
  return (
    <>{!currentUser ? NevigateToLoginPage.push("/login") : <HomePage />}</>
  );
}
