import { useForm } from "react-hook-form";
import { Input, Select, Button } from "./";
import databaseServices from "../appwrite/database";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { createPost } from "../store/postsSlice";

interface PostFormData {
  title: string;
  slug: string;
  content: string;
  status: string;
}

const PostForm = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.auth.userData);
  const { register, handleSubmit, watch, setValue } = useForm<PostFormData>();

  const submit = async (data: PostFormData) => {
    setError("");
    try {
      // console.log(userData);

      const postData = await databaseServices.createPost(data, userData?.$id);
      dispatch(createPost(postData));
      // console.log(postData);

      navigate(`/post/${postData.$id}`);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      throw error;
    }
  };

  const slugTransform = useCallback((value: string) => {
    if (value) {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        if (value.title)
          setValue("slug", slugTransform(value.title), {
            shouldValidate: true,
          });
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);
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
          label="Slug : "
          type="text"
          placeholder="slug"
          {...register("slug", { required: true })}
          readonly={true}
          onInput={(e) => setValue("slug", slugTransform(e.target.value))}
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
