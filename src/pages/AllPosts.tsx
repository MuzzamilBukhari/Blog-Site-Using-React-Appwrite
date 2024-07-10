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
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllPosts;
