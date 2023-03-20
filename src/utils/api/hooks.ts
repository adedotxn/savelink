import React, { useState } from "react";

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

    setGettingLinkInfo({ manually: false, opengraph: true });
    setInfoLoading(true);

    // fetch the webpage using the Open Graph protocol
    fetch(
      `https://opengraph.io/api/1.1/site/${encodeURIComponent(link)}?app_id=${
        process.env.NEXT_PUBLIC_OG_KEY
      }`
    )
      .then((response) => response.json())
      .then((data) => {
        setOGData(data.hybridGraph);
        setTitle(data.hybridGraph.title);
        return setInfoLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setInfoLoading(false);
      });
  };

  return { generateLinkInfo, gettingLinkInfo, setGettingLinkInfo, infoLoading };
};
