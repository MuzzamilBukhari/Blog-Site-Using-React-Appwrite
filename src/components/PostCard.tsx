import { Models } from "appwrite";
import { Link } from "react-router-dom";

const PostCard = ({ post }: { post: Models.Document }) => {
  return (
    <Link to={`/post/${post.$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            // src={`${bucketService.getFilePreview(featuredImage)}`}
            src="https://media.istockphoto.com/id/1386341272/photo/abstract-modern-tech-of-programming-code-screen-developer.jpg?s=1024x1024&w=is&k=20&c=jpW8mLvcrvhgDyPbwHV7OoluREDU5GLxk-I6gg13hw8="
            width="50px"
            height="50px"
            alt={post.title}
          />
        </div>
        <h2>{post.title}</h2>
      </div>
    </Link>
  );
};

export default PostCard;
