import authSession from "@/libs/authSession";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";

const AuthLink = () => {
  const { data: session } = useSession();
  // const session = await authSession();
  // console.log(session);

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
