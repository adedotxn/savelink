import { toast } from "sonner";
import { useEffect, useState } from "react";

export const webShare = async (title: string, url: string) => {
  const shareOpts = {
    title: title,
    url: url,
  };

  try {
    await navigator.share(shareOpts);
  } catch (err) {
    console.error("Error sharing", err);
  }
};

export const copyToClipboard = (link: string, id: number) => {
  navigator.clipboard.writeText(link).then(() => {
    toast.success("Link copied to clipboard");
  });
};

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);
  return matches;
};
