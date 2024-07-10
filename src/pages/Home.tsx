import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Container, PostCard } from "../components";
import { useEffect } from "react";
import databaseServices from "../appwrite/database";
import { fetchPosts } from "../store/postsSlice";

const Home = () => {
  const authStatus = useSelector((state: RootState) => state.auth.status);
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts);

  useEffect(() => {
    databaseServices.getPosts().then((res) => {
      dispatch(fetchPosts(res.documents));
    });
  }, []);
  // console.log(posts[0]);

  if (authStatus && posts) {
    return (
      <div className="w-full py-8">
        <Container>
          <div className="flex flex-wrap">
            {posts.map((post) =>
              post.status === "active" ? (
                <div key={post.$id} className="p-2 w-1/4">
                  <PostCard post={post} />
                </div>
              ) : null
            )}
          </div>
        </Container>
      </div>
    );
  }
  return (
    // <div className="w-full py-8 mt-4 text-center">
    //   <Container>
    //     <div className="flex flex-wrap">
    //       <div className="p-2 w-full">
    //         <h1 className="text-2xl font-bold hover:text-gray-500">
    //           Login to read posts
    //         </h1>
    //       </div>
    //     </div>
    //   </Container>
    // </div>
    <div className="w-full py-8 mt-4 text-center bg-gray-100">
      <Container>
        <div className="flex flex-wrap justify-center">
          <div className="p-2 w-full">
            <h1 className="text-4xl font-bold text-gray-800 hover:text-gray-500 transition duration-200">
              Login to read posts
            </h1>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
