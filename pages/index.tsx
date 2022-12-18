
import Head from "next/head";
import { useState } from "react";
import { Categories, PostCard, PostWidget } from "../components";
import { getPosts, getSearchedPosts } from "../services";
import {BsSearch} from  'react-icons/bs';
import {IoMdClose} from 'react-icons/io'
export default function Home({ posts }: any) {
  const [searchedPosts,setSearchedPosts] = useState(posts);
  const [search,setSearch] = useState(''); 
  const onSearchHandler=async(e)=>{
    setSearchedPosts([]);
    e.preventDefault();
    await getSearchedPosts(search).then((result)=>setSearchedPosts(result));
  }
  return (
    <div className="container min-h-fit mx-auto px-10 mb-8">
      <Head>
        <title>BLOG-Soumyajeet Sarkar</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* grid component start */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/*posts */}
        <div className="lg:col-span-8 col-span-1">
          <div className="mb-4 inline-flex items-center object-center w-full rounded-lg bg-gray-100 focus:ring-2 focus:ring-gray-200">
          <input type="text" placeholder="Search" value={search} onChange={(e)=>setSearch(e.target.value)} className="flex grow py-2 px-4 outline-none rounded-lg bg-gray-100 text-gray-700"/>
          {search && <button className="flex mx-2 h-fit w-fit text-black" onClick={()=>setSearch('')}><IoMdClose size={30}/></button>}
          <button className="flex mx-2 h-fit w-fit text-black" onClick={onSearchHandler}><BsSearch size={30}/></button>
          </div>
          {(search?searchedPosts:posts).map((post: any) => (
            <PostCard post={post.node} key={post.title} />
          ))}
        </div>
        {/* posts end */}
        {/* sidebar: recent/related posts and categories */}
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
          <div className="text-gray-500 text-lg text-center">Powered by NextJs, GraphQl and Tailwind</div>
          <div className="text-gray-500 text-lg text-center">By <a className="transition duration-500 hover:text-black cursor-pointer">Soumyajeet Sarkar</a></div>
        </div>
        {/* grid  component end */}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const posts = (await getPosts()) || [];

  return {
    props: { posts },
  };
}
