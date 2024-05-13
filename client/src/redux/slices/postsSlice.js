import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";


export const getUserProfile = createAsyncThunk(
    "user/getUserProfile",
    async (body) => {
        try {
            const response = await axiosClient.get(
                "/user/getUserProfile",
                body
            );
            console.log('result',response.result)
            return response.result;
        } catch (error) {
            console.log(error)
            return Promise.reject(error);
        }
    }
);

export const likeAndUnlikePost = createAsyncThunk(
    "post/likeAndUnlike",
    async (body) => {
        try {
            const response = await axiosClient.post("/posts/like", body);
            return response.result.post;
        } catch (error) {
            return Promise.reject(error);
        } 
    }
);

const postsSlice = createSlice({
    name: "postsSlice",
    initialState: {
        userProfile: {},
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.userProfile = action.payload;
            })
            
    },
});

export default postsSlice.reducer;