import { useForm } from "react-hook-form";
import { Input, Select, Button } from "./";
import databaseServices from "../appwrite/database";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createPost } from "../store/postsSlice";

interface PostFormData {
  title: string;
  content: string;
  status: string;
}

const PostForm = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.auth.userData);
  const { register, handleSubmit } = useForm<PostFormData>();

  const submit = async (data: PostFormData) => {
    setError("");
    try {
      console.log(userData);

      const postData = await databaseServices.createPost(data, userData?.$id);
      dispatch(createPost(postData));
      navigate("/");
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      throw error;
    }
  };

  return (
    <div>
      <p>{error}</p>
      <form onSubmit={handleSubmit(submit)}>
        <Input
          label="Title : "
          type="text"
          placeholder="Enter post title"
          {...register("title", { required: true })}
        />
        <Input
          label="Post description : "
          type="text"
          placeholder="Write post content"
          {...register("content", { required: true })}
        />
        <Select
          label="status"
          options={["active", "inactive"]}
          {...register("status")}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default PostForm;
