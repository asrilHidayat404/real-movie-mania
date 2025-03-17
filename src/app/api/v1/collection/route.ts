import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const body = await request.json();
  console.log({ body });

  // Your logic to handle the POST request
  return NextResponse.json({
    status: true,
    message: "Collection updated",
    body,
  });
};
