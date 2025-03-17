import React from "react";

const page = () => {
  return (
    <main className="mt-20">
      <h1 className="text-4xl font-bold text-center">Collection</h1>
      {/* make card for listing movie in wishlist */}
      <div className="container mx-auto mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-100 p-4 rounded-md">
            <img
              src="https://via.placeholder.com/300"
              alt="..."
              className="rounded-md"
            />
            <h3 className="text-xl font-bold mt-2">Title</h3>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
