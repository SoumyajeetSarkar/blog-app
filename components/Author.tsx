import React from "react";
import Image from "next/image";
const Author = ({ author }: any) => {
  return (
    <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-40">
      <div className="absolute left-0 right-0 -top-14">
        <Image
          unoptimized={true}
          alt={author.name}
          height={100}
          width={100}
          className="align-middle mx-auto object-cover rounded-full w-[100px] h-[100px]"
          src={author.photo.url}
        />
      </div>
      <h3 className="text-white mt-4 mb-4 text-xl font-bold">{author.name}</h3>
      <p className="text-white text-ls">{author.bio}</p>
    </div>
  );
};

export default Author;
