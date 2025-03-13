import React from "react";
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
