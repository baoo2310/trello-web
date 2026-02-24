import { toast } from "react-toastify";
import authorizedAxiosInstance from "~/utils/authorizeAxios";
import { API_ROOT } from "~/utils/constants";

// export const fetchBoardDetailsAPI = async (boardId) => {
//     const res = await authorizedAxiosInstance.get(`${API_ROOT}/v1/boards/${boardId}`);
//     return res.data;
// }

export const createNewColumnAPI = async (newColumnData) => {
    const res = await authorizedAxiosInstance.post(`${API_ROOT}/v1/columns/`, newColumnData);
    return res.data;
}

export const createNewCardAPI = async (newCardData) => {
    const res = await authorizedAxiosInstance.post(`${API_ROOT}/v1/cards/`, newCardData);
    return res.data;
}

export const updateBoardAPI = async (boardId, updateData) => {
    const res = await authorizedAxiosInstance.put(`${API_ROOT}/v1/boards/${boardId}`, updateData);
    return res.data;
};

export const updateColumnAPI = async (columnId, updateData) => {
    const res = await authorizedAxiosInstance.put(`${API_ROOT}/v1/columns/${columnId}`, updateData);
    return res.data;
};

export const updateCardAPI = async (cardId, updateData) => {
    const res = await authorizedAxiosInstance.put(`${API_ROOT}/v1/cards/${cardId}`, updateData);
    return res.data;
};

export const deleteCardAPI = async (cardId) => {
    const res = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/cards/${cardId}`);
    return res.data;
}

export const deleteColumnAPI = async (columnId) => {
    const res = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/columns/${columnId}`);
    return res.data;
}

export const registerUserAPI = async (data) => {
    const res = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/register`, data);
    toast.success('Account created successfully! Please check and verify your account before login in', {theme: 'colored'});
    return res.data;
}

export const verifyUserAPI = async (data) => {
    const res = await authorizedAxiosInstance.put(`${API_ROOT}/v1/users/verify`, data);
    toast.success('Account verified successfully! Now you can login and enjoy our services', {theme: 'colored'});
    return res.data;
}

export const refreshTokenAPI = async () => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/users/refresh_token`);
    return response.data;
}