import Link from "next/link";
import styles from "./list.module.css";
import { toast, Toaster } from "sonner";
import { useState } from "react";
import DeleteOption from "./deleteDialog";
import {
  BookmarkFilledIcon,
  BookmarkIcon,
  TrashIcon,
} from "@radix-ui/react-icons";

import { useBookmark, useDelete } from "@utils/api";
import { useSearch } from "@utils/context";
import { copyToClipboard, webShare } from "@utils/helpers/toolbox";
import { LinkInterface } from "@utils/interface";
import { useRouter } from "next/router";
import { CopySvg, ShareSvg } from "./svg";

interface arrayInterface {
  array: LinkInterface[];
  name: string;
}

const List = ({ name, array }: arrayInterface) => {
  const deleteMutation = useDelete(toast);
  const bookmarkMutation = useBookmark(toast);
  const router = useRouter();

  const [modal, setModal] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);

  const { search } = useSearch();

  const triggerDeleteDialog = (id: number): void => {
    if (modal === id) {
      setOpen(true);
    }
  };

  const closeDeleteDialog = (): void => {
    setModal(0);
  };

  const deleteLink = (id: number): void => {
    deleteMutation.mutate({ identifier: name, id });
    closeDeleteDialog();
  };

  return (
    <>
      {array.length === 0 ? (
        <div>
          <h2>Wow, such nothing 👀</h2>
        </div>
      ) : (
        array
          .filter((data) => {
            if (search === "") {
              return array;
            } else if (
              data.title.toLowerCase().includes(search.toLowerCase()) ||
              data.url.toLowerCase().includes(search.toLowerCase())
            ) {
              return array;
            }
          })
          ?.map((data) => (
            <div key={data._id} className={styles.link_wrapper}>
              <div
                className={[
                  styles.link_list,
                  styles.dark_scheme,
                  styles.light_scheme,
                ].join(" ")}
              >
                <div
                  className={styles.links}
                  onClick={() => {
                    data.url.includes("http")
                      ? router.push(`${data.url}`)
                      : router.push(`https://${data.url}`);
                  }}
                >
                  <h3>{data.title}</h3>
                  <p>
                    {data.url.includes("http") ? (
                      <Link target="_blank" href={data.url}>
                        {data.url}
                      </Link>
                    ) : (
                      <Link target="_blank" href={`https://${data.url}`}>
                        {`https://${data.url}`}
                      </Link>
                    )}
                  </p>
                </div>
                <div className={styles.link__footer}>
                  <div className={styles.link__category}>
                    <div>
                      {data.categories.length === 0 && data.category ? (
                        <Link
                          href={`/v1/${data.identifier}/category/${data.category}`}
                        >
                          <span className={styles.categ}>{data.category}</span>
                        </Link>
                      ) : data.category === undefined && data.categories ? (
                        <>
                          {data.categories.length === 0 && <></>}

                          {data.categories.length === 1 && (
                            <Link
                              href={`/v1/${data.identifier}/category/${data.categories[0]}`}
                            >
                              <span className={styles.categ}>
                                {data.categories[0]}
                              </span>
                            </Link>
                          )}

                          {data.categories.length > 1 && (
                            <>
                              <Link
                                href={`/v1/${data.identifier}/category/${data.categories[0]}`}
                              >
                                <span className={styles.categ}>
                                  {data.categories[0]}
                                </span>
                              </Link>

                              <Link
                                href={`/v1/${data.identifier}/category/${data.categories[1]}`}
                              >
                                <span className={styles.categ}>
                                  {data.categories[1]}
                                </span>
                              </Link>
                            </>
                          )}
                        </>
                      ) : null}
                    </div>
                  </div>

                  <div className={styles.link__images}>
                    <div
                      className={styles.link__image}
                      onClick={() => {
                        bookmarkMutation.mutate(data._id);
                      }}
                    >
                      {data.bookmarked ? (
                        <BookmarkFilledIcon width={24} height={24} />
                      ) : (
                        <BookmarkIcon width={24} height={24} />
                      )}
                      {/* <SvgComponent starred={data.bookmarked} /> */}
                    </div>

                    <div
                      onClick={() => {
                        data.url.includes("http")
                          ? webShare(data.title, `${data.url}`)
                          : webShare(data.title, `https://${data.url}`);
                      }}
                      className={styles.link__image}
                    >
                      <ShareSvg />
                    </div>

                    <div onClick={() => copyToClipboard(data.url, data._id)}>
                      <CopySvg />
                    </div>

                    {modal === data._id && (
                      <DeleteOption
                        id={data._id}
                        title={data.title}
                        deleteLink={deleteLink}
                        closeDeleteDialog={closeDeleteDialog}
                      />
                    )}

                    <div
                      onClick={() => setModal(data._id)}
                      className={styles.link__image}
                    >
                      <TrashIcon width="26" height="26" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
      )}
    </>
  );
};

export default List;
