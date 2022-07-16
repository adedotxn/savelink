import apiClient from "../http-config";

export interface LinkInterface {
    bookmarked?: boolean,
    identifier?: string,
    time?: string,
    title: string,
    url: string,
    category? :string
}

export const userLinks = async (user:string) => {
    const fetch = await apiClient.get(`/${user}`);
    return fetch.data
}

export const addLink = (newLink : LinkInterface) => {
    return apiClient.post('/cr8', newLink)
}

export const deleteLink = (id : string | number) => {
    return apiClient.delete(`/delete/${id}`)
}

export const bookmarkLink = (id : string | number) => {
    return apiClient.post(`/bookmark/${id}`)
}

export const getCategories = (category : string) => {
    return apiClient.post(`/category/${category}`)
}
