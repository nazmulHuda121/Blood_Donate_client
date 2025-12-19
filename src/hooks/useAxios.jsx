import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://blood-donate-server-ten.vercel.app/',
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
