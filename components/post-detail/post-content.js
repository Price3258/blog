import PostHeader from "./post-header";
import classes from "./post-content.module.css";
import ReactMarkDown from "react-markdown";

const DUMMY_POST = {
  slug: "getting-started-with-nextjs",
  title: "Getting started with nextjs",
  image: "getting-started-nextjs.png",
  date: "2023-02-10",
  content: "# This is a first post",
};

export default function PostContent(props) {
  const { post } = props;
  const imagePath = `/images/posts/${post.slug}/${post.image}`;
  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkDown>{post.content}</ReactMarkDown>
    </article>
  );
}
