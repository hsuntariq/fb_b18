import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addPost, getAllPosts } from "./postService";

const initialState = {
  posts: [],
  postLoading: false,
  postError: false,
  postSuccess: false,
  postMessage: "",
};

export const addPostData = createAsyncThunk(
  "add-post",
  async (postData, thunkAPI) => {
    try {
      return await addPost(postData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.respose.data.error);
    }
  }
);

export const getPostData = createAsyncThunk(
  "get-posts",
  async (_, thunkAPI) => {
    try {
      return await getAllPosts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postReset: (state) => {
      state.postError = false;
      state.postLoading = false;
      state.postMessage = "";
      state.postSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPostData.pending, (state, action) => {
        state.postLoading = true;
      })
      .addCase(addPostData.rejected, (state, action) => {
        state.postLoading = false;
        state.postError = true;
        state.postMessage = action.payload;
      })
      .addCase(addPostData.fulfilled, (state, action) => {
        state.postLoading = false;
        state.postSuccess = true;
        state.posts.unshift(action.payload);
      })
      .addCase(getPostData.pending, (state, action) => {
        state.postLoading = true;
      })
      .addCase(getPostData.rejected, (state, action) => {
        state.postLoading = false;
        state.postError = true;
        state.postMessage = action.payload;
      })
      .addCase(getPostData.fulfilled, (state, action) => {
        state.postLoading = false;
        state.posts = action.payload;
      });
  },
});

export const { postReset } = postSlice.actions;
export default postSlice.reducer;
