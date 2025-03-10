import AllPosts from "@/components/posts/all-posts";
import { getAllPosts } from "@/lib/posts-util";

export default function AllPostPage(props) {
  return <AllPosts posts={props.posts} />;
}

export function getStaticProps() {
  const posts = getAllPosts();

  return {
    props: {
      posts,
    },
  };
}
