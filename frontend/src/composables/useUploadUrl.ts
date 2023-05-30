import { baseURL } from "../baseConfig";

function getUploadURL (url: string) {
    return `${baseURL}${url}`;
}

export function useUploadURL (url: string) {
    return getUploadURL(url);
}