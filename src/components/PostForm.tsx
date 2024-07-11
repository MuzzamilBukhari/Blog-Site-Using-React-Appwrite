import { useForm } from "react-hook-form";
import { Input, Select, Button, RTE } from "./";
import databaseServices from "../appwrite/database";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { createPost, updatePost } from "../store/postsSlice";
import { Models } from "appwrite";
import bucketServices from "../appwrite/bucket";

interface PostFormData {
  title: string;
  slug: string;
  content: string;
  status: string;
  featuredImage: File;
}

const PostForm = ({ post }: { post?: Models.Document }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.auth.userData);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    control,
  } = useForm<PostFormData>({
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      status: "active",
    },
  });

  useEffect(() => {
    if (post) {
      setValue("title", post.title);
      setValue("slug", post.$id);
      setValue("content", post.content);
      setValue("status", post.status);
      setLoading(false);
    }
  }, [post, setValue]);

  const submit = async (data: PostFormData) => {
    setError("");
    try {
      if (post) {
        const postData = await databaseServices.updatePost(data, post.$id);
        if (postData) {
          dispatch(updatePost(postData));
          navigate(`/post/${postData.$id}`);
        }
      } else {
        console.log(typeof data.featuredImage);
        // const file = await bucketServices.uploadFile(data.featuredImage);
        // if (file) {
          const postData = await databaseServices.createPost(
            data,
            // file.$id,
            userData?.$id
          );
          dispatch(createPost(postData));
          navigate(`/post/${postData.$id}`);
        }
      }
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
    // console.log(post);

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
    <div className="w-full mt-5">
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-full lg:w-2/3 px-2 mb-4">
          <Input
            label="Title : "
            type="text"
            placeholder="Enter post title"
            className="mb-4 w-full"
            {...register("title", { required: true })}
          />
          <Input
            label="Slug : "
            type="text"
            placeholder="slug"
            className="mb-4 w-full"
            {...register("slug", { required: true })}
            readonly={true}
            onInput={(e) => setValue("slug", slugTransform(e.target.value))}
          />
          <RTE
            name="content"
            label="Content"
            control={control}
            defaultValue={getValues("content")}
            className="w-full"
          />
        </div>
        <div className="w-full lg:w-1/3 px-2 mb-4">
          <Input
            placeholder=""
            type="file"
            label="Featured Image"
            accept=""
            className="mb-4"
            {...register("featuredImage", { required: !post })}
          />
          <Select
            label="Status"
            options={["active", "inactive"]}
            className="mb-4 w-full"
            {...register("status")}
          />
          <Button type="submit" className="w-full">
            {post ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
