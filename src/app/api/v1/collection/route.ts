import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { movieId, title, userEmail, movieImage } = await request.json();
console.log({ movieId, title, userEmail, movieImage })
  // Your logic to handle the POST request
  await prisma.collection.create({
    data: {
      anime_mal_id: movieId.toString(),
      user_email: userEmail,
      anime_image: movieImage,
      anime_title: title
    }
  });
  return NextResponse.json({
    status: true,
    message: "Collection updated",
  });
};
