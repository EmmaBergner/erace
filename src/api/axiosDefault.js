import axios from "axios";

axios.defaults.baseURL = "https://erace-api.herokuapp.com/"; //"http://localhost:8000" KOM IHÅ
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.withCredentials = true;

export const axiosReq = axios.create()
export const axiosRes = axios.create()