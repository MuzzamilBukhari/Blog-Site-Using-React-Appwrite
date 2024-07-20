import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Container, PostCard } from "../components";
import { useEffect } from "react";
import databaseServices from "../appwrite/database";
import { fetchPosts } from "../store/postsSlice";
import { Link } from "react-router-dom";

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
      <div className="w-full py-8 bg-gray-50">
        <Container>
          {/* Welcome Section */}
          <section className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-darkBlue mb-4">
              Welcome Back!
            </h1>
            <p className="text-lg text-gray-700">
              Explore the latest and most popular posts, and discover new
              categories.
            </p>
          </section>

          {/* Featured Posts */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-darkBlue mb-6">
              Featured Posts
            </h2>
            <div className="flex flex-wrap -m-2">
              {posts.map((post) => (
                <div
                  key={post.$id}
                  className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                >
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          </section>

          {/* Latest Posts */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-darkBlue mb-6">
              Latest Posts
            </h2>
            <div className="flex flex-wrap -m-2">
              {posts
                .filter((post) => post.status === "active")
                // .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by latest
                .slice(0, 6) // Display the latest 6 posts
                .map((post) => (
                  <div
                    key={post.$id}
                    className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                  >
                    <PostCard post={post} />
                  </div>
                ))}
            </div>
          </section>

          {/* Popular Posts */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-darkBlue mb-6">
              Popular Posts
            </h2>
            <div className="flex flex-wrap -m-2">
              {posts
                .filter((post) => post.status === "active")
                .sort((a, b) => b.views - a.views) // Sort by most views
                .slice(0, 6) // Display the top 6 posts
                .map((post) => (
                  <div
                    key={post.$id}
                    className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                  >
                    <PostCard post={post} />
                  </div>
                ))}
            </div>
          </section>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8 text-center bg-gradient-to-r from-darkBlue via-green to-purple">
      <Container>
        <div className="flex flex-wrap justify-center mt-8">
          <div className="p-2 w-full">
            <h1 className="text-4xl font-bold text-lightBlue hover:text-white transition duration-200">
              Login to read posts
            </h1>
            <p className="mt-4 text-lg text-lightBlue">
              Join our community and stay updated with the latest posts and
              articles.
            </p>
            <div className="mt-6 space-x-4">
              <Link
                to="/login"
                className="inline-block px-6 py-3 text-lg font-medium text-darkBlue bg-lightBlue rounded-full hover:bg-white transition duration-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="inline-block px-6 py-3 text-lg font-medium text-darkBlue bg-lightBlue rounded-full hover:bg-white transition duration-200"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-lightBlue">Featured Posts</h2>
          <div className="flex flex-wrap justify-center mt-6 space-x-4">
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-darkBlue">
                Post Title 1
              </h3>
              <p className="text-gray-700">Brief description of the post...</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-darkBlue">
                Post Title 2
              </h3>
              <p className="text-gray-700">Brief description of the post...</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-darkBlue">
                Post Title 3
              </h3>
              <p className="text-gray-700">Brief description of the post...</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
