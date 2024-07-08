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
    fetchPosts: (state, actions) => {
      state.posts = actions.payload;
    },
  },
});

export const { createPost, fetchPosts } = postsSlice.actions;

export default postsSlice.reducer;
