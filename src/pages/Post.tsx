import { Link, useNavigate, useParams } from "react-router-dom";
import databaseServices from "../appwrite/database";
import { useEffect, useState } from "react";
import { Models } from "appwrite";
import { Button, Container } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { deletePost as storeDeletePost } from "../store/postsSlice";

const Post = () => {
  const [post, setPost] = useState<Models.Document | undefined>();
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts);

  const userData = useSelector((state: RootState) => state.auth.userData);

  const isAuthor = userData?.$id === post?.userId;

  useEffect(() => {
    if (slug) {
      const post = posts.find((post) => post.$id === slug);
      if (post) setPost(post);
      else navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    if (slug) {
      databaseServices.deletePost(slug).then(() => {
        dispatch(storeDeletePost(slug));
        navigate("/all-posts");
      });
    }
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src="https://media.istockphoto.com/id/1386341272/photo/abstract-modern-tech-of-programming-code-screen-developer.jpg?s=1024x1024&w=is&k=20&c=jpW8mLvcrvhgDyPbwHV7OoluREDU5GLxk-I6gg13hw8="
            alt={post.title}
            className="rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3" type={"button"}>
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" type="button" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{post.content}</div>
      </Container>
    </div>
  ) : null;
};

export default Post;
