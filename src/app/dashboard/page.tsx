// import React from "react";
// import authSession from "@/libs/authSession";
// import { redirect } from "next/navigation";
// import { WithAuth, WithAuthProps } from "@/layouts/Auth";

import CollectionButton from "@/components/CollectionButton";
import AuthenticatedPage from "@/layouts/Auth";
import authSession from "@/libs/authSession";
import Link from "next/link";

// const page = ({ user }: WithAuthProps) => {
//   console.log(user);

//   return (
//     <main className="w-screen h-screen flex flex-col justify-center items-center">
//       <h1 className="text-4xl font-bold mb-5">Selamat Datang di welcome</h1>
//       <div>
//         <img
//           src={user.image ? user.image : "https://via.placeholder.com/300"}
//           alt="..."
//           width={300}
//           className="rounded-full mb-4"
//         />
//         <p className="text-center font-bold text-2xl">{user.name}</p>
//       </div>
//     </main>
//   );
// };

// export default WithAuth(page);

export default async function Page() {
  const user = await authSession();
  console.log(user);

  return (
    <AuthenticatedPage>
      <main className="w-screen h-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-5">Welcome...</h1>
        <div>
          <img
            src={user?.image ? user?.image : "https://via.placeholder.com/300"}
            alt="..."
            width={300}
            className="rounded-full mb-4"
          />
          <p className="text-center font-bold text-2xl">{user?.name}</p>
          <p className="text-center text-sm">{user?.email}</p>
        </div>
        <Link
          href={`/dashboard/${user?.name}/collection`}
          className="px-5 py-2 bg-orange-500 text-gray-700 rounded-md"
        >
          My Collection
        </Link>
      </main>
    </AuthenticatedPage>
  );
}
