import React from "react";
import {
  PostWidget,
  Categories,
  PostDetail,
  Author,
  CommentForm,
  CommentSection,
  Loader,
} from "../../components";
import { getPostDetails, getPosts } from "../../services";
import { useRouter } from "next/router";

const PostDetails = ({ post }: any) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-10 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-8">
          <PostDetail post={post} />
          <Author author={post.author} />
          <CommentForm slug={post.postUrl} />
          <CommentSection slug={post.postUrl} />
        </div>

        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <PostWidget
              slug={post.postUrl}
              categories={post.categories.map((category: any) => category.url)}
            />
            <Categories />
            <div className="text-gray-500 text-lg text-center">
              Powered by NextJs, GraphQl and Tailwind
            </div>
            <div className="text-gray-500 text-lg text-center">
              By{" "}
              <a className="transition duration-500 hover:text-black cursor-pointer">
                Soumyajeet Sarkar
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;

export async function getStaticProps({ params }: any) {
  const data = await getPostDetails(params.slug);

  return {
    props: { post: data },
  };
}

export async function getStaticPaths() {
  const posts = await getPosts();

  return {
    paths: posts.map(({ node: { postUrl } }: any) => ({
      params: { slug: postUrl },
    })),
    fallback: true,
  };
}
