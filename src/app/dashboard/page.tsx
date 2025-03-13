import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import authSession from "@/libs/authSession";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await authSession();
  console.log(user);
  if (!user) {
    redirect("/");
  }

  return <div>page</div>;
};

export default page;
