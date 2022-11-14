import { useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { BASE_URL } from "../api/Api";

const url = BASE_URL;

export default function useAxios() {
  const [auth] = useContext(AuthContext);

  const apiClient = axios.create({
    baseURL: url,
  });

  apiClient.interceptors.request.use(function (config) {
    config.headers.Authorization = auth ? `Bearer ${auth.accessToken}` : "";
    return config;
  });

  return apiClient;
}