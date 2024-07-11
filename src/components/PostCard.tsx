import { Models } from "appwrite";
import { Link } from "react-router-dom";
import bucketServices from "../appwrite/bucket";


const PostCard = ({ post }: { post: Models.Document }) => {

  return (
    <Link to={`/post/${post.$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4 hover:shadow-lg transition-shadow duration-300 ease-in-out">
        <div className="w-full flex justify-center mb-4">
          <img
            src={`${bucketServices.getFilePreview(post.featuredImage)}`}
            width="100%"
            className="rounded-t-xl object-cover h-48"
            alt={post.title}
          />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h2>
        {/* <p className="text-gray-600">By {post.author}</p> */}
      </div>
    </Link>
  );
};

export default PostCard;
