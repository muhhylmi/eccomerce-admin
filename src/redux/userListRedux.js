import { createSlice } from "@reduxjs/toolkit";

export const userListSlice = createSlice({
    name: "userList",
    initialState: {
        userList: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        //GET ALL
        getUserListStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        getUserListSuccess: (state, action) => {
            state.isFetching = false;
            state.userList = action.payload;
        },
        getUserListFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //DELETE
        deleteUserListStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteUserListSuccess: (state, action) => {
            state.isFetching = false;
            state.userList.splice(
                state.userList.findIndex((item) => item._id === action.payload),
                1
            );
        },
        deleteUserListFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //UPDATE
        updateUserListStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        updateUserListSuccess: (state, action) => {
            state.isFetching = false;
            state.userList[
                state.userList.findIndex((item) => item._id === action.payload.id)
            ] = action.payload.userList;
        },
        updateUserListFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        //UPDATE
        addUserListStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        addUserListSuccess: (state, action) => {
            state.isFetching = false;
            state.userList.push(action.payload);
        },
        addUserListFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const {
    getUserListStart,
    getUserListSuccess,
    getUserListFailure,
    deleteUserListStart,
    deleteUserListSuccess,
    deleteUserListFailure,
    updateUserListStart,
    updateUserListSuccess,
    updateUserListFailure,
    addUserListStart,
    addUserListSuccess,
    addUserListFailure
} = userListSlice.actions;

export default userListSlice.reducer;
