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
  featuredImage: File[];
}

const PostForm = ({ post }: { post?: Models.Document }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.auth.userData);
  console.log(loading);

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
        let fileId = post.featuredImage;
        if (data.featuredImage[0]) {
          const response = await bucketServices.deleteFile(post.featuredImage);
          console.log("response agya");

          if (response) {
            const file = await bucketServices.uploadFile(data.featuredImage[0]);
            console.log("file upload hogai");

            if (file) {
              fileId = file.$id;
              console.log("id bh asign hogai");
            }
          }
          console.log("image di h");
        }
        const postData = await databaseServices.updatePost(
          data,
          fileId,
          post.$id
        );
        if (postData) {
          dispatch(updatePost(postData));
          navigate(`/post/${postData.$id}`);
        }
      } else {
        const file = await bucketServices.uploadFile(data.featuredImage[0]);

        if (file) {
          const postData = await databaseServices.createPost(
            data,
            file.$id,
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
    // <div className="w-full mt-5">
    //   {error && <p className="text-red-500">{error}</p>}
    //   <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
    //     <div className="w-full lg:w-2/3 px-2 mb-4">
    //       <Input
    //         label="Title : "
    //         type="text"
    //         placeholder="Enter post title"
    //         className="mb-4 w-full"
    //         {...register("title", { required: true })}
    //       />
    //       <Input
    //         label="Slug : "
    //         type="text"
    //         placeholder="slug"
    //         className="mb-4 w-full"
    //         {...register("slug", { required: true })}
    //         readonly={true}
    //         onInput={(e) => setValue("slug", slugTransform(e.target.value))}
    //       />
    //       <RTE
    //         name="content"
    //         label="Content"
    //         control={control}
    //         defaultValue={getValues("content")}
    //         className="w-full"
    //       />
    //     </div>
    //     <div className="w-full lg:w-1/3 px-2 mb-4">
    //       {post && (
    //         <div>
    //           <img
    //             src={`${bucketServices.getFilePreview(post.featuredImage)}`}
    //             alt={post.title}
    //           />
    //         </div>
    //       )}
    //       <Input
    //         placeholder=""
    //         type="file"
    //         label="Featured Image"
    //         accept=""
    //         className="mb-4"
    //         {...register("featuredImage", { required: !post })}
    //       />
    //       <Select
    //         label="Status"
    //         options={["active", "inactive"]}
    //         className="mb-4 w-full"
    //         {...register("status")}
    //       />
    //       <Button type="submit" className="w-full">
    //         {post ? "Update" : "Submit"}
    //       </Button>
    //     </div>
    //   </form>
    // </div>
    <div className="w-full mt-5">
      {/* Display error message if exists */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Form */}
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-wrap bg-white shadow-lg rounded-lg p-6 border border-gray-200"
      >
        {/* Main Content */}
        <div className="w-full lg:w-2/3 px-2 mb-4">
          <Input
            label="Title"
            type="text"
            placeholder="Enter post title"
            className="mb-4 w-full"
            {...register("title", { required: true })}
          />
          <Input
            label="Slug"
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
            className="w-full mb-4"
          />
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-1/3 px-2 mb-4">
          {/* Display featured image if exists */}
          {post && post.featuredImage && (
            <div className="mb-4">
              <img
                src={`${bucketServices.getFilePreview(post.featuredImage)}`}
                alt={post.title}
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          )}

          <Input
            type="file"
            placeholder=""
            label="Featured Image"
            accept="image/*"
            className="mb-4"
            {...register("featuredImage", { required: !post })}
          />
          <Select
            label="Status"
            options={["active", "inactive"]}
            className="mb-4 w-full"
            {...register("status")}
          />
          <Button
            type="submit"
            className="w-full py-3 bg-darkBlue text-white rounded-lg shadow-md hover:bg-darkBlueDark transition duration-200 ease-in-out"
          >
            {post ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
