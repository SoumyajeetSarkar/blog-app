import React, { useEffect, useState } from "react";
import moment from "moment";
import Link from "next/link";
import { getRecentPosts, getRelatedPosts } from "../services";

const PostWidget = ({ slug, categories }: any) => {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    if (slug) {
      getRelatedPosts(categories, slug).then((result) => {setPosts(result)});
    } else {
      getRecentPosts().then((result) => {setPosts(result)});
    }
  }, [slug]);

  
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
      <h3 className="text-xl mb-8 font-semibold border-b pb-4">
        {slug ? "Related Posts" : "Recent Posts"}
      </h3>
      {posts?.map((post: any, index) => (
        <div key={index} className="flex items-center w-full mb-4">
          <div className="w-16 flex-none">
            <img
              height="60px"
              width="60px"
              className="align-middle rounded-full"
              alt={post.title}
              src={post.contentImage.url}
            />
          </div>
          <div className="flex-grow ml-4">
            <p className="text-gray-500 font-xs">
              {moment(post.createdAt).format('MM DD, YYYY')}
            </p>
            <Link href={`/post/${post.postUrl}`} className="text-md">
              {post.title}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostWidget;
