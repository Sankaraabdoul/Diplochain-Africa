import axios from 'axios';

const API_BASE_URL = 'https://veritrust-dozy.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const issueDiploma = async (data) => {
  try {
    const response = await api.post('/diplomas/issue', data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const verifyDiploma = async (serialNumber) => {
  try {
    const response = await api.get(`/diplomas/verify/${serialNumber}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getAllDiplomas = async () => {
  try {
    const response = await api.get('/diplomas');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default api;