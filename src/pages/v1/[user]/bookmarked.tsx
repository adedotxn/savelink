import type { GetServerSidePropsContext, NextPage } from "next";
import styles from "@styles/dashboard.module.css";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { useSession } from "next-auth/react";
import { userLinks } from "@utils/api";
import { unstable_getServerSession } from "next-auth";

import List from "@components/lists";
import { authOptions } from "@api/auth/[...nextauth]";

const Bookmark: NextPage = () => {
  const { data: session } = useSession();
  const name: string = session?.user?.email!;

  const { isLoading, error, data } = useQuery(["bookmarks", name], () =>
    userLinks(name)
  );

  if (error) {
    if (error instanceof Error) {
      console.log("creation error", error.message);
    } else {
      console.log(`Unexpected error in bookmark page : ${error}`);
    }
  }

  if (isLoading) {
    return (
      <div className="loading_container">
        <div className="lds_ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  if (!isLoading) {
    let bookmarked = data.filter(
      (e: { bookmarked: boolean }) => e.bookmarked === true
    );

    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <section>
            <List name={name} array={bookmarked} />
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section>
          <h2>Something went wrong</h2>
        </section>
      </main>
    </div>
  );
};

export default Bookmark;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("bookmarks", () =>
    userLinks(session?.user?.email!)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
