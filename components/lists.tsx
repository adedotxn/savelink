import Link from "next/link";
import styles from "./list.module.css";
import SvgComponent from "./svg/starsvg";
import DeleteSvg from "./svg/delete";
import ShareSvg from "./svg/share";
import { useBookmark, useDelete } from "../utils/api/api";
import toast, { Toaster } from "react-hot-toast";
import { useSearch } from "../utils/helpers/context";
import { useState } from "react";
import CopySvg from "./svg/copy";
import { SchemeInterface_Array } from "../utils/interface";
import { copyToClipboard, webShare } from "../utils/helpers/toolbox";
import { spawn } from "child_process";

const List = ({ array }: SchemeInterface_Array) => {
  const deleteMutation = useDelete(toast);
  const bookmarkMutation = useBookmark();

  const [modal, setModal] = useState(0);

  const { search } = useSearch();

  array.filter((data) => {
    if (search === "") {
      return array;
    } else if (
      data.title.toLowerCase().includes(search.toLowerCase()) ||
      data.url.toLowerCase().includes(search.toLowerCase())
    ) {
      return array;
    }
  });

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
              <div>
                <Toaster position="top-center" reverseOrder={false} />
              </div>

              <div
                className={[
                  styles.link_list,
                  styles.dark_scheme,
                  styles.light_scheme,
                ].join(" ")}
              >
                <Link
                  href={
                    data.url.includes("http")
                      ? `${data.url}`
                      : `https://${data.url}`
                  }
                >
                  <a target="_blank">
                    <div className={styles.links}>
                      <h3>{data.title}</h3>
                      <p>
                        {data.url.includes("http") ? (
                          <Link href={data.url}>
                            <a target="_blank">{data.url}</a>
                          </Link>
                        ) : (
                          <Link href={`https://${data.url}`}>
                            <a target="_blank">{`https://${data.url}`}</a>
                          </Link>
                        )}
                      </p>
                    </div>
                  </a>
                </Link>
                <div className={styles.link__footer}>
                  <div className={styles.link__category}>
                    <Link
                      href={`/v1/${data.identifier}/category/${data.category}`}
                    >
                      <div>
                        {data.categories.length === 0 && data.category ? (
                          <span className={styles.categ}>{data.category}</span>
                        ) : data.category === undefined && data.categories ? (
                          <>
                            <span className={styles.categ}>
                              {data.categories[0]}
                              {/* <span> +{data.categories.length - 1}</span> */}
                            </span>
                            <span className={styles.categ}>
                              {data.categories[1]}
                            </span>
                          </>
                        ) : null}
                      </div>
                    </Link>
                  </div>

                  <div className={styles.link__images}>
                    <div
                      className={styles.link__image}
                      onClick={() => {
                        bookmarkMutation.mutate(data._id);
                      }}
                    >
                      <SvgComponent starred={data.bookmarked} />
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

                    {modal === data._id ? (
                      <div className={styles.confirm}>
                        <button onClick={() => deleteMutation.mutate(data._id)}>
                          Confirm
                        </button>
                        <span onClick={() => setModal(0)}>X</span>
                      </div>
                    ) : (
                      <div
                        onClick={() => setModal(data._id)}
                        className={styles.link__image}
                      >
                        <DeleteSvg />
                      </div>
                    )}
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
