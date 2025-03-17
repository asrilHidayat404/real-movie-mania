import { getServerSession } from "next-auth";

const authSession = async () => {
  const session = await getServerSession();
  console.log({ session });

  return session?.user;
};

export default authSession;
