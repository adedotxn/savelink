import { useMutation, useQuery, useQueryClient } from "react-query";
import apiClient from "./http-config";

export interface LinkInterface {
  bookmarked?: boolean;
  identifier?: string;
  time?: string;
  title: string;
  url: string;
  categories?: string[];
}

export const userLinks = async (user: string) => {
  const fetch = await apiClient.get(`/${user}`);
  return fetch.data;
};

export const addLink = (newLink: LinkInterface) => {
  return apiClient.post(`/${newLink.identifier}/cr8`, newLink);
};

export const deleteLink = (id: string | number) => {
  return apiClient.delete(`/delete/${id}`);
};

export const bookmarkLink = (id: string | number) => {
  return apiClient.post(`/bookmark/${id}`);
};

export const getCategories = (
  user: string | string[] | undefined,
  category: string | string[] | undefined
) => {
  console.log(`/${user}/category/${category}`);
  return apiClient.get(`/${user}/category/${category}`);
};

//hook to get all links relative to a user
export const useDataGetter = (user: string) => {
  return useQuery(["links", user], () => apiClient.get(`/${user}`));
};

export const useCreate = (toast: any, resetForm: () => void) => {
  const queryClient = useQueryClient();

  return useMutation(addLink, {
    onSuccess: () => {
      queryClient.invalidateQueries(["links"]);
    },
    onSettled: (error, variable, context) => {
      resetForm();
      toast.success(`Saved ${context.title}`);
    },
    onError: (error) => {
      toast.error("Error saving link", error);
      console.log("Error saving link", error);
    },
  });
};

export const useCreateOnly = (toast: any) => {
  const queryClient = useQueryClient();

  return useMutation(addLink, {
    onSuccess: () => {
      queryClient.invalidateQueries(["links"]);
    },
    onSettled: (error, variable, context) => {
      toast.success(`Saved ${context.title}`);
    },
    onError: (error) => {
      toast.error("Error saving link", error);
      console.log("Error saving link", error);
    },
  });
};

export const useDelete = (toast: any) => {
  const queryClient = useQueryClient();
  return useMutation(deleteLink, {
    onSuccess: () => {
      queryClient.invalidateQueries(["links"]);
      queryClient.invalidateQueries(["bookmarks"]);
    },
    onSettled: () => {
      toast.success(`Deleted`);
    },
    onError: () => {
      toast.error(`Error deleting. Retry`);
    },
  });
};

export const useBookmark = () => {
  const queryClient = useQueryClient();
  return useMutation(bookmarkLink, {
    onSuccess: () => {
      queryClient.invalidateQueries(["links"]);
      queryClient.invalidateQueries(["bookmarks"]);
    },
    onError: (error) => {
      console.log("Mutation error", error);
    },
  });
};
