"use client";

import styles from "@styles/dashboard.module.css";
import Dialog from "@components/board/dialog";
import List from "@components/shared/lists";
import { useIntersectionObserver } from "@utils/helpers/toolbox";
import { useRef, useState, useEffect } from "react";
import { SavedLink } from "@utils/interface";
import Spinner from "@components/ui/spinner";

interface BoardList {
  data: { name: string; data: SavedLink[]; categories: string[] };
  getUserData: (limit?: number) => Promise<{
    name: string;
    data: SavedLink[];
    categories: string[];
  }>;
  total: number;
}

export default function BoardList({ data, getUserData, total }: BoardList) {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const isVisible = !!entry?.isIntersecting;

  const fetching = useRef(false);
  const [currLimit, setCurrLimit] = useState(1);
  const [_allLinks, _setAllLinks] = useState([data.data]);
  const allLinks = _allLinks.flatMap((link) => link);

  const loadMore = async (limit: number) => {
    if (!fetching.current) {
      try {
        fetching.current = true;

        const data = await getUserData(limit);
        _setAllLinks((prev) => [...prev, data.data]);
      } finally {
        fetching.current = false;
      }
    }
  };

  useEffect(() => {
    /** When a link is deleted or saved, the db updates but the client state doesn't so
     * ..this is to track an update in db and update the links without.
     */
    _setAllLinks([data.data]);
  }, [total]);

  useEffect(() => {
    if (isVisible) {
      setCurrLimit((curr) => curr + 1);
      loadMore(currLimit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section>
          <List name={data.name} savedlinks={allLinks} />

          {total === allLinks.length || total === 0 ? null : (
            <div className={styles.paginator} ref={ref}>
              <Spinner size="30px" />
            </div>
          )}
        </section>
      </main>

      <footer className={styles.footer}>
        <Dialog name={data.name} categories={data.categories} />
      </footer>
    </div>
  );
}
