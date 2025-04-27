import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addPost } from "./postService";

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
        state.posts.push(action.payload);
      });
  },
});

export const { postReset } = postSlice.actions;
export default postSlice.reducer;
