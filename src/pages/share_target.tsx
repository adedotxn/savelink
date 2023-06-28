import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useCreateOnly, useDataGetter } from "@utils/api";
import styles from "@styles/target.module.css";
import { useRouter } from "next/router";
import Multiselect from "@components/multiselect";
import { AxiosResponse } from "axios";
import { useLinkInfo } from "@utils/hooks/use-LinkInfo";
import { useMultiSelect } from "@utils/hooks/use-Multiselect";

const ShareTarget = () => {
  const router = useRouter();

  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/signin");
    },
  });
  const createMutation = useCreateOnly(toast);

  const name: string = session?.user?.email!;

  const { title: queryTitle, text: queryText } = router.query;

  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  // useEEffect 'cause i cant't debug/inspect share target and this is honestly what works blindly
  useEffect(() => {
    setTitle(queryTitle?.toString()!);
    setLink(queryText?.toString()!);
  }, [queryTitle, queryText]);

  function useData() {
    const result = useDataGetter(name);
    const data = result.data as AxiosResponse<any, any>;
    const isLoading: boolean = result.isLoading;
    return { data, isLoading };
  }

  const storedData = useData();
  const data = storedData?.data?.data;
  const isLoading = storedData.isLoading;

  let returnedCategories: string[] = [];
  if (!isLoading) {
    for (let i: number = 0; i < data.length; ++i) {
      returnedCategories.push(data[i].category);
    }
  }
  const categories = [...new Set(returnedCategories)];

  const { allSelected, selectedStore, toggleOption } = useMultiSelect();

  const [typedCateg, setTypedCateg] = useState("");
  const handleChange = useCallback(
    (e: { target: { value: React.SetStateAction<string> } }) => {
      setTypedCateg(e.target.value);
    },
    []
  );

  const { generateLinkInfo, gettingLinkInfo, setGettingLinkInfo, infoLoading } =
    useLinkInfo(link, setTitle);

  const saveLink = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (title.trim().length === 0 || link.trim().length === 0)
      return toast.error("Empty Link/Title");

    let categories;
    if (typedCateg.length === 0 && allSelected.length > 0) {
      categories = allSelected;
    } else if (typedCateg.length > 0 && allSelected.length === 0) {
      categories = [typedCateg];
    } else if (typedCateg.length === 0 && allSelected.length === 0) {
      categories = ["default"];
    } else if (typedCateg.length > 0 && allSelected.length > 0) {
      categories = allSelected;
    }

    if (categories !== undefined) {
      createMutation.mutate({
        identifier: name,
        title,
        url: link,
        categories,
      });
    }

    router.replace(`/board`);
  };

  return (
    <>
      <div className={styles.container}>
        <form className={styles.form} action="">
          <label>
            <h3>Link</h3>
            <input
              onChange={(e) => setLink(e.target.value)}
              type="text"
              value={link}
            />
          </label>

          <div className={styles.link_info__btns}>
            <button type="button" onClick={() => generateLinkInfo()}>
              Generate Link Info
            </button>

            <button
              type="button"
              onClick={() =>
                setGettingLinkInfo({ manually: true, opengraph: false })
              }
            >
              Type it in manually
            </button>
          </div>

          {infoLoading ? (
            <span style={{ margin: ".8rem 0rem" }}>Getting...</span>
          ) : (
            <input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              name="title"
              placeholder="Title"
            />
          )}

          <div>
            <h3>Select or Add new category</h3>
            <input
              onChange={handleChange}
              type="text"
              placeholder='Example : "Software Eng. Links"'
            />
            {!isLoading ? (
              <>
                <Multiselect
                  options={categories}
                  toggleOption={toggleOption}
                  selected={selectedStore}
                />
              </>
            ) : (
              <p>loading..</p>
            )}
          </div>
          <button onClick={saveLink}> Save </button>
        </form>
      </div>
    </>
  );
};

export default ShareTarget;
