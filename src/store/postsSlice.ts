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
    deletePost: (state, actions) => {
      state.posts = state.posts.filter((post) => post.$id !== actions.payload);
    },
    fetchPosts: (state, actions) => {
      state.posts = actions.payload;
    },
  },
});

export const { createPost, fetchPosts, deletePost } = postsSlice.actions;

export default postsSlice.reducer;
