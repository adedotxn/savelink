import { addLinkInterface, LinkInterface } from "@utils/interface";
import { useMutation, useQuery, useQueryClient } from "react-query";
import apiClient from "./http-config";

export const userLinks = async (user: string) => {
  const fetch = await apiClient.get(`/${user}`);
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

export const getCategories = (
  user: string | string[],
  category: string | string[]
) => {
  console.log(`/${user}/category/${category}`);
  return apiClient.get(`/${user}/category/${category}`);
};

//hook to get all links relative to a user
export const useDataGetter = (user: string) => {
  return useQuery(["links", user], () => apiClient.get(`/${user}`));
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
