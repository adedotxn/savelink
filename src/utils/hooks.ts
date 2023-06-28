import React, { useState } from "react";
import { toast } from "sonner";

export const useMultiSelect = () => {
  const [selectedStore, setStore] = useState<{ [key: string]: boolean }>({});
  const toggleOption = (category: string) => {
    if (selectedStore[category]) {
      setStore({
        ...selectedStore,
        [category]: false,
      });
    } else {
      setStore({
        ...selectedStore,
        [category]: true,
      });
    }
  };
  const allSelected = Object.keys(selectedStore).filter(
    (key) => selectedStore[key] === true
  );

  return { selectedStore, allSelected, setStore, toggleOption };
};

interface OpenGraph {
  title: string;
  description: string;
  type: string;
  image: string;
  url: string;
  favicon: string;
  site_name: string;
}

export const useLinkInfo = (
  link: string,
  setTitle: React.Dispatch<React.SetStateAction<string>>
) => {
  const [infoLoading, setInfoLoading] = useState(false);
  const [OGData, setOGData] = useState<OpenGraph>();
  const [gettingLinkInfo, setGettingLinkInfo] = useState({
    manually: false,
    opengraph: false,
  });

  const generateLinkInfo = () => {
    if (link.trim().length === 0) return;

    const linkToGet = link.includes("https") ? link : `https://${link}`;

    setGettingLinkInfo({ manually: false, opengraph: true });
    setInfoLoading(true);

    // fetch the webpage using the Open Graph protocol
    fetch(
      `https://opengraph.io/api/1.1/site/${encodeURIComponent(
        linkToGet
      )}?app_id=${process.env.NEXT_PUBLIC_OG_KEY}`
    )
      .then((response) => {
        console.log(response.status);

        if (response.status === 400) {
          setInfoLoading(false);
          return toast.error("Invalid Link. Check again");
        }

        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        if (data.hybridGraph !== undefined) {
          setOGData(data.hybridGraph);
          setTitle(data.hybridGraph.title);
          setInfoLoading(false);
        } else {
          setTitle(
            "[Invalid link, but in incase this is a medium or an actually accurate link, type in your own title]"
          );
          setInfoLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);

        setInfoLoading(false);
        return toast.error(error);
      });
  };

  return { generateLinkInfo, gettingLinkInfo, setGettingLinkInfo, infoLoading };
};
