import { Models } from "appwrite";
import { Link } from "react-router-dom";
import bucketServices from "../appwrite/bucket";

const PostCard = ({ post }: { post: Models.Document }) => {
  return (
    <Link to={`/post/${post.$id}`} className="block w-full">
      <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl border border-darkBlue/10 transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <div className="w-full flex justify-center mb-4">
          <img
            src={`${bucketServices.getFilePreview(post.featuredImage)}`}
            alt={post.title}
            className="rounded-t-xl object-cover h-48 w-full transition-transform duration-300 ease-in-out hover:scale-105"
          />
        </div>
        <h2 className="text-xl font-semibold text-darkBlue mb-2 hover:text-green transition duration-200">
          {post.title}
        </h2>
      </div>
    </Link>
  );
};

export default PostCard;
