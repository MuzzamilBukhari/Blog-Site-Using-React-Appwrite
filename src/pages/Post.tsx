import { Link, useNavigate, useParams } from "react-router-dom";
import databaseServices from "../appwrite/database";
import { useEffect, useState } from "react";
import { Models } from "appwrite";
import { Button, Container } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { deletePost as storeDeletePost } from "../store/postsSlice";
import parse from "html-react-parser";
import bucketServices from "../appwrite/bucket";

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
        {/* Post Image */}
        <div className="relative w-full flex justify-center mb-4 border rounded-xl bg-white shadow-lg overflow-hidden">
          <img
            src={`${bucketServices.getFilePreview(post.featuredImage)}`}
            alt={post.title}
            className="w-full h-96 object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
          />

          {/* Edit and Delete Buttons */}
          {isAuthor && (
            <div className="absolute top-4 right-4 flex space-x-3">
              <Link to={`/edit-post/${post.$id}`}>
                <Button
                  bgColor="bg-green-500"
                  className="text-white shadow-md hover:bg-green-600 transition duration-200"
                  type="button"
                >
                  Edit
                </Button>
              </Link>
              <Button
                bgColor="bg-red-500"
                className="text-white shadow-md hover:bg-red-600 transition duration-200"
                type="button"
                onClick={deletePost}
              >
                Delete
              </Button>
            </div>
          )}
        </div>

        {/* Post Title */}
        <div className="w-full mb-6">
          <h1 className="text-4xl font-bold text-darkBlue">{post.title}</h1>
        </div>

        {/* Post Content */}
        <div className="prose max-w-none text-gray-800">
          {parse(post.content)}
        </div>
      </Container>
    </div>
  ) : null;
};

export default Post;
