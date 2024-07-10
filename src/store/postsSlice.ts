import { createSlice } from "@reduxjs/toolkit";
import { Models } from "appwrite";

const initialState: { posts: Models.Document[] } = {
  posts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    createPost: (state, actions) => {
      const post = actions.payload;
      state.posts.push(post);
    },
    updatePost: (state, actions) => {
      const updatedPost = actions.payload;
      state.posts = state.posts.map((post) =>
        post.$id === updatedPost.$id ? updatedPost : post
      );
    },
    deletePost: (state, actions) => {
      state.posts = state.posts.filter((post) => post.$id !== actions.payload);
    },
    fetchPosts: (state, actions) => {
      state.posts = actions.payload;
    },
  },
});

export const {
  createPost,
  fetchPosts,
  deletePost,
  updatePost,
} = postsSlice.actions;

export default postsSlice.reducer;
