import { baseURL } from "../baseConfig";

function getUploadURL (url: string): string {
    return `${baseURL}${url}`;
}

export function useUploadURL (url: string): string {
    return getUploadURL(url);
}