import axios from "axios";

export const baseURL = "http://localhost:1337";
export const frontURL = "http://localhost:5173";

export const api = axios.create({
    baseURL: `${baseURL}/api/`,
    timeout: 3000,
});