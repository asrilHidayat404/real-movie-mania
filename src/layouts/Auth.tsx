// import authSession from "@/libs/authSession";
// import { redirect } from "next/navigation";
// type User = {
//   name: string;
//   email: string;
//   image: string;
// };
// export type WithAuthProps = {
//   user: User;
// };

// export function WithAuth<P extends WithAuthProps>(
//   WrappedComponent: React.ComponentType
// ) {
//   return async function AuthenticatedComponent(
//     props: Omit<P, keyof WithAuthProps>
//   ) {
//     const user = await authSession();
//     if (!user) {
//       redirect("/api/auth/signin");
//     }
//     return <WrappedComponent {...(props as P)} user={user} />;
//   };
// }

import authSession from "@/libs/authSession";
import { redirect } from "next/navigation";

export default async function AuthenticatedPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await authSession();
  if (!user) {
    redirect("/api/auth/signin");
  }

  return <>{children}</>;
}
