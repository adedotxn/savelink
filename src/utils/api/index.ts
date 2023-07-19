import { addLinkInterface, SavedLink } from "@utils/interface";
import { useMutation, useQuery, useQueryClient } from "react-query";
import apiClient from "./http-config";

export const userLinks = async (user: string): Promise<SavedLink[]> => {
  const fetch = await apiClient.get(`/${user}`);
  return fetch.data;
};

export const getBookmarks = async (user: string): Promise<SavedLink[]> => {
  const fetch = await apiClient.get(`/${user}/bookmarks`);
  return fetch.data;
};

export const addLink = (details: addLinkInterface) => {
  return apiClient.post(`/${details.identifier}/save`, details);
};

export const deleteLink = (details: {
  identifier: string;
  id: string | number;
}) => {
  return apiClient.delete(`${details.identifier}/save/${details.id}`);
};

export const bookmarkLink = (id: string | number) => {
  return apiClient.put(`/bookmark/${id}`);
};

export const listCategories = async (user: string): Promise<string[]> => {
  const fetch = await apiClient.get(`${user}/categories`);
  return fetch.data;
};

export const getCategories = (
  user: string | string[],
  category: string | string[]
) => {
  return apiClient.get(`/${user}/category/${category}`);
};

//hook to get all links relative to a user
async function getAllUserSavedLinks(user: string): Promise<SavedLink[]> {
  const response = await apiClient.get(`/${user}`);
  return response.data;
}

export const useDataGetter = (user: string) => {
  return useQuery({
    queryKey: ["links", user],
    queryFn: () => getAllUserSavedLinks(user),
  });
};

export const useLinkTitle = (url: string) => {
  return useQuery({
    queryKey: ["link"],
    queryFn: () => {
      apiClient.get(`link/${url}`);
    },
  });
};

export const useCreate = (toast: any, resetForm: () => void) => {
  const queryClient = useQueryClient();

  return useMutation(addLink, {
    onSuccess: () => {
      queryClient.invalidateQueries(["links"]);
      queryClient.invalidateQueries(["categories"]);
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
    onSuccess: (context) => {
      queryClient.invalidateQueries(["links"]);
      queryClient.invalidateQueries(["categories"]);
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
      queryClient.invalidateQueries(["categories"]);
      return toast.success(`Deleted`);
    },

    onError: () => {
      toast.error(`Error deleting. Retry`);
    },
  });
};

export const useBookmark = (toast: any) => {
  const queryClient = useQueryClient();
  return useMutation(bookmarkLink, {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["links"]);
      queryClient.invalidateQueries(["bookmarks"]);
      return toast.success(`${data.data.message}`);
    },

    onError: (error) => {
      console.log("Mutation error", error);
      return toast.error("Error Bookmarking Link. Try again");
    },
  });
};
