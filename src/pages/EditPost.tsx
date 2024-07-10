import { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Models } from "appwrite";

const EditPost = () => {
  const [post, setPost] = useState<Models.Document | undefined>();
  const navigate = useNavigate();
  const { slug } = useParams();
  const posts = useSelector((state: RootState) => state.posts.posts);

  useEffect(() => {
    if (slug) {
      const post = posts.find((post) => post.$id === slug);
      if (post) setPost(post);
      else navigate("/");
    }
  }, [slug, navigate]);

  return (
    <Container>
      <PostForm post={post} />
    </Container>
  );
};

export default EditPost;
