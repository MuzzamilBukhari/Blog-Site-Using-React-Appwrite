import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Container } from "../components";

const Home = () => {
  const authStatus = useSelector((state: RootState) => state.auth.status);

  return authStatus ? (
    <p>Homepage</p>
  ) : (
    <div className="w-full py-8 mt-4 text-center">
      <Container>
        <div className="flex flex-wrap">
          <div className="p-2 w-full">
            <h1 className="text-2xl font-bold hover:text-gray-500">
              Login to read posts
            </h1>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
