import Head from "next/head";

import PostContent from "@/components/post-detail/post-content";
import { getPostData, getPostsFiles } from "@/lib/posts-util";

export default function PostDetailPage(props) {
  return (
    <>
      <Head>
        <title>{props.post.title}</title>
        <meta name="description" content={props.post.excerpt} />
      </Head>
      <PostContent post={props.post} />
    </>
  );
}

export function getStaticProps(context) {
  const { params } = context;

  const post = getPostData(params.slug);

  return {
    props: {
      post,
    },
    revalidate: 600,
  };
}

export function getStaticPaths() {
  const postFilenames = getPostsFiles();

  const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, ""));

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
}
/*
 paths: [],
    fallback: true,
  이렇게 하면 모든 블로그를 그때그때 만듦.
*/
