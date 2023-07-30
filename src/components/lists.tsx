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
import { useRouter } from "next/router";
import { CopySvg, ShareSvg } from "./svg";
import Nolinks from "./ui/nolinks";
import { SavedLink } from "@utils/interface";

interface arrayInterface {
  savedlinks: SavedLink[];
  name: string;
}

const List = ({ name, savedlinks }: arrayInterface) => {
  const deleteMutation = useDelete(toast);
  const bookmarkMutation = useBookmark(toast);
  const router = useRouter();

  const [modal, setModal] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const { search } = useSearch();

  const triggerDeleteDialog = (id: string): void => {
    if (modal === id) {
      setOpen(true);
    }
  };

  const closeDeleteDialog = (): void => {
    setModal("");
  };

  const deleteLink = (id: string): void => {
    deleteMutation.mutate({ identifier: name, id });
    closeDeleteDialog();
  };

  return (
    <>
      {savedlinks.length === 0 ? (
        <Nolinks />
      ) : (
        savedlinks
          .filter((data) => {
            if (search === "") {
              return savedlinks;
            } else if (
              data.title.toLowerCase().includes(search.toLowerCase()) ||
              data.url.toLowerCase().includes(search.toLowerCase())
            ) {
              return savedlinks;
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
                  <div className={styles.link__category}></div>

                  <Categories
                    categories={data.categories}
                    category={data.category}
                    identifier={data.identifier}
                  />
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

                    <div onClick={() => copyToClipboard(data.url)}>
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

function Categories(props: {
  categories: String[];
  identifier: String;
  category?: string;
}) {
  // if we're only dealing with the old schema (when I was using category and not categories)
  if (props.category !== undefined) {
    if (props.categories.length === 0 && props.category) {
      return (
        <Link href={`/category/${props.category}`}>
          <span className={styles.categ}>{props.category}</span>
        </Link>
      );
    }
  }

  // if dealing with categories
  if (props.category === undefined && props.categories) {
    if (props.categories.length === 0) {
      return <></>;
    }

    if (props.categories.length === 1) {
      return (
        <Link href={`/category/${props.categories[0]}`}>
          <span className={styles.categ}>{props.categories[0]}</span>
        </Link>
      );
    }

    if (props.categories.length > 1) {
      return (
        <>
          <Link href={`/category/${props.categories[0]}`}>
            <span className={styles.categ}>{props.categories[0]}</span>
          </Link>

          <Link href={`/category/${props.categories[1]}`}>
            <span className={styles.categ}>{props.categories[1]}</span>
          </Link>
        </>
      );
    }
  }

  return <></>;
}
