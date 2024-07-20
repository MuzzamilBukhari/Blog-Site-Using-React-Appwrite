import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Container } from "../components";
import PostCard from "../components/PostCard";
import { useEffect } from "react";
import databaseServices from "../appwrite/database";
import { fetchPosts } from "../store/postsSlice";

const AllPosts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts);

  // if someone refresh page at allposts page then it fetches posts again
  useEffect(() => {
    databaseServices.getPosts().then((res) => {
      dispatch(fetchPosts(res.documents));
    });
  }, []);

  return (
    <div className="w-full py-8 bg-gray-50">
      <Container>
        <h1 className="text-3xl font-bold text-darkBlue text-center mb-8 transition-transform duration-500 ease-in-out transform hover:scale-105">
          All Posts
        </h1>
        <div className="flex flex-wrap -m-2">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 transition-transform duration-500 ease-in-out transform hover:scale-105"
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllPosts;
