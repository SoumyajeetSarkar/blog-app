import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getCategories } from "../services";

const NavBar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((result) => setCategories(result));
  }, []);

  return (
    <div className="container top-0 mx-auto px-10 mb-8">
      <div className="border-b w-full inline-block border-blue-400 py-8">
        <div className="md:float-left block">
          <Link href="/">
            <span className="cursor-pointer font-bold text-4xl text-white">
              {"<h2>My Personal Blog<h2/>"}
            </span>
          </Link>
        </div>
        <div className="hidden md:float-left md:contents">
          {categories.map((category:any) => (
            <Link key={category.url} href={`/categories/${category.url}`}>
              <span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
                #{category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
