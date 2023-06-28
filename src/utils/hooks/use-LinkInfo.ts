import React, { useState } from "react";
import { toast } from "sonner";

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

  const generateLinkInfo = async () => {
    const response = await getLinkPreview(link);
    if (response?.status === "success") {
      setTitle(response.data?.title);
      setOGData(response.data);
      setInfoLoading(false);
    }

    if (response?.status === "error") {
      setTitle(
        "[Invalid link, but in incase this is a medium or an actually accurate link, type in your own title]"
      );
      setInfoLoading(false);
      return toast.error("Invalid Link. Check again");
    }
  };

  return { generateLinkInfo, gettingLinkInfo, setGettingLinkInfo, infoLoading };
};

async function getLinkPreview(link: string) {
  const linkToGet = link.includes("https") ? link : `https://${link}`;

  /** This is a custom parsing logic that uses the Open Graph API at first
   * and then on failure falls back to using cheerio through a proxy server
   * to avoid cors and and parser the site's html to extract details */
  async function fetchLinkPreview() {
    try {
      const response = await fetch(
        `https://opengraph.io/api/1.1/site/${encodeURIComponent(
          linkToGet
        )}?app_id=${process.env.NEXT_PUBLIC_OG_KEY}`
      );
      const data = await response.json();
      // console.log("data", data);

      if (data.error) {
        throw new Error("Failed to fetch link preview using Open Graph API");
      }

      if (data && data.hybridGraph) {
        // console.log("OG Data", data);
        return { status: "success", data: data.hybridGraph };
        // setPreviewData(data);
      } else {
        throw new Error("Failed to fetch link preview using Open Graph API");
      }
    } catch (error) {
      try {
        const response = await fetch(
          `/api/link-preview/${encodeURIComponent(link)}`
        );
        const data = await response.json();
        return { status: "success", data: data };
      } catch (error) {
        console.error(error);
        return { status: "error" };
      }
    }
  } //end of inner function

  if (link) {
    const response = await fetchLinkPreview();
    return response;
  }
}
