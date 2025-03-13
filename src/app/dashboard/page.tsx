import React from "react";
import authSession from "@/libs/authSession";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await authSession();
  console.log(user);
  if (!user) {
    redirect("/");
  }

  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-5">Selamat Datang di welcome</h1>
      <div>
        <img
          src={user.image ? user.image : "https://via.placeholder.com/300"}
          alt="..."
          width={300}
          className="rounded-full mb-4"
        />
        <p className="text-center font-bold text-2xl">{user.name}</p>
      </div>
    </main>
  );
};

export default page;
