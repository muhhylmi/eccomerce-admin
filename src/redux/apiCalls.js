import { loginFailure, loginStart, loginSuccess, logoutUser } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
    deleteProductFailure,
    deleteProductStart,
    deleteProductSuccess,
    getProductFailure,
    getProductStart,
    getProductSuccess,
    updateProductStart,
    updateProductSuccess,
    updateProductFailure,
    addProductStart,
    addProductSuccess,
    addProductFailure
} from "./productRedux";
import { addUserListFailure, addUserListStart, addUserListSuccess, deleteUserListFailure, deleteUserListStart, deleteUserListSuccess, getUserListFailure, getUserListStart, getUserListSuccess, updateUserListFailure, updateUserListStart, updateUserListSuccess } from "./userListRedux";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
};

export const logout = async (dispatch) => {
    dispatch(logoutUser());
}

export const getProducts = async (dispatch) => {
    dispatch(getProductStart());
    try {
        const res = await publicRequest.get("/products");
        dispatch(getProductSuccess(res.data));
    } catch (err) {
        dispatch(getProductFailure());
    }
};

export const deleteProduct = async (id, dispatch) => {
    dispatch(deleteProductStart());
    try {
        await userRequest.delete(`/products/${id}`);
        dispatch(deleteProductSuccess(id));
    } catch (err) {
        dispatch(deleteProductFailure());
    }
};

export const updateProduct = async (id, product, dispatch) => {
    dispatch(updateProductStart());
    try {
        const { data } = await userRequest.put(`/products/${id}`, product);
        dispatch(updateProductSuccess({ id, product: data }));
    } catch (err) {
        dispatch(updateProductFailure());
    }
};
export const addProduct = async (product, dispatch) => {
    dispatch(addProductStart());
    try {
        const res = await userRequest.post(`/products`, product);
        dispatch(addProductSuccess(res.data));
    } catch (err) {
        dispatch(addProductFailure());
    }
};


export const getUserList = async (dispatch) => {
    dispatch(getUserListStart());
    try {
        const res = await userRequest.get("/users");
        dispatch(getUserListSuccess(res.data));
    } catch (err) {
        dispatch(getUserListFailure());
    }
};

export const deleteUserList = async (id, dispatch) => {
    dispatch(deleteUserListStart());
    try {
        // const res = await userRequest.delete(`/users/${id}`);
        dispatch(deleteUserListSuccess(id));
    } catch (err) {
        dispatch(deleteUserListFailure());
    }
};

export const updateUserList = async (id, user, dispatch) => {
    dispatch(updateUserListStart());
    try {
        // update
        const res = await userRequest.put(`/users/${id}`, user);
        dispatch(updateUserListSuccess(id, res.data));
    } catch (err) {
        dispatch(updateUserListFailure());
    }
};
export const addUserList = async (user, dispatch) => {
    dispatch(addUserListStart());
    try {
        const res = await userRequest.post(`/auth/register`, user);
        dispatch(addUserListSuccess(res.data));
    } catch (err) {
        dispatch(addUserListFailure());
    }
};
