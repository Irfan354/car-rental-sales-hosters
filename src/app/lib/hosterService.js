// src/services/hosterService.js
import api from "./api";

/**
 * Register a new Hoster (with documents)
 * Uses multipart/form-data because of file uploads
 */
export const registerHoster = async (formData) => {
    const config = {
        headers:{
            "content-type" : "multipart/form-data",
        },
    };
  // formData is expected to be a FormData object
  const response = await api.post("/hosters/register", formData, config);
  return response.data;
};

/**
 * Get Hoster by User ID
 */
export const getHosterByUserId = async (userId) => {
  const response = await api.get(`/hosters/${userId}`);
  return response.data;
};


export const getAllHosters = async() => {
  const response = await api.get("/hosters");
  return response.data;
}

