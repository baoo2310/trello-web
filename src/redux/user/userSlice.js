import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import authorizedAxiosInstance from "~/utils/authorizeAxios";
import { API_ROOT } from "~/utils/constants";

const initialState = {
    currentUser: null,
};

// Actions call api (async) and update data to redux. Use middleware createAsyncThunk with extraReducers

export const loginUserAPI = createAsyncThunk(
    'user/loginUserAPI',
    async (data) => {
        const res = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/login`, data);
        return res.data;
    }
)

export const logoutUserAPI = createAsyncThunk(
    'user/logoutUserAPI',
    async (showSucessMessage = true) => {
        const response = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/users/logout`);
        if(showSucessMessage) toast.success('Logged out successfully!');
        return response.data;
    }
)

export const updateUserAPI = createAsyncThunk(
    'user/updateUserAPI',
    async (data) => {
        const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/users/update`, data);
        return response.data;
    }
)

// Init a slice in redux store

export const userSlice = createSlice({
    name: 'user',
    initialState,
    // Where to handle synchronous data
    reducers: {},
    // Extra reducers: Where to handle asynchronous data
    extraReducers: (builder) => {
        builder.addCase(loginUserAPI.fulfilled, (state, action) => {
            // action.payload is the res.data
            state.currentUser = action.payload;
        });
        builder.addCase(logoutUserAPI.fulfilled, (state) => {
            state.currentUser = null;
        });
        builder.addCase(updateUserAPI.fulfilled, (state, action) => {
            const user = action.payload;
            state.currentUser = user;
        });
    }
});

// Action is where components below call dispatch() to update data through reducer (synch)

// export const {} = userSlice.actions;

// Selector is where components below call by useSelector() hook to take the data from redux store and use
export const selectCurrentUser = (state) => {
    return state.user.currentUser;
}

// export default userSlice.reducer;
export const userReducer = userSlice.reducer;
