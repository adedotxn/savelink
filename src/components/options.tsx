import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { generateCSV, header } from "@utils/helpers/downloadCsv";
import styles from "./options.module.css";
import { useDataGetter } from "@utils/api";

const Options = ({ options, name }: { options: boolean; name: string }) => {
  function useData() {
    const { isLoading, error, data } = useDataGetter(name);
    return { data, error, isLoading };
  }
  const storedData = useData();
  const data = storedData?.data;
  const { data: session } = useSession();

  const download = () => {
    if (data)
      generateCSV(
        header,
        data,
        `${session?.user?.name?.toLowerCase()}_savelink_data`
      );
  };

  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const onClick = (evt: { preventDefault: () => void }) => {
    evt.preventDefault();
    if (!promptInstall && !supportsPWA) {
      return;
    }
    promptInstall.prompt();
  };

  return (
    <>
      {options && (
        <div className={styles.options}>
          <ul>
            <li onClick={download}> Export my savelink data</li>
            <li onClick={onClick}>Install web app</li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Options;
