import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session } from "inspector/promises";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const AuthLink = () => {
  const { data: session } = useSession();
  return (
    <>
      <li>
        <Link href={session ? "api/auth/signout" : "api/auth/signin"}>
          {session ? "Sign Out" : "Sign In"}
        </Link>
      </li>
      <li>{session ? <Link href="/dashboard">Dashboard</Link> : null}</li>
    </>
  );
};

export default AuthLink;
