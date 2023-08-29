import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import type { GetServerSidePropsContext, NextPage } from "next";
import styles from "@styles/dashboard.module.css";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { getBookmarks, userLinks } from "@utils/api";

import List from "@components/lists";
import { authOptions } from "@api/auth/[...nextauth]";
import { useRouter } from "next/router";
import { SavedLink } from "@utils/interface";

const Bookmark: NextPage = () => {
  const { replace } = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      replace("/signin");
    },
  });
  const name: string = session?.user?.email!;

  async function getData(name: string): Promise<SavedLink[]> {
    const data = await getBookmarks(name);
    return data;
  }
  const { isLoading, error, data } = useQuery({
    queryKey: ["bookmarks", name],
    queryFn: () => getData(name),
  });

  if (error) {
    if (error instanceof Error) {
      console.log("creation error", error.message);
    } else {
      console.log(`Unexpected error in bookmark page : ${error}`);
    }
  }

  if (isLoading || data === undefined) {
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
    return (
      <div className={styles.container}>
        <main className={styles.main}>
          <section>
            <List name={name} savedlinks={data} />
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
  const session = await getServerSession(context.req, context.res, authOptions);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["bookmarks"], () =>
    userLinks(session?.user?.email!)
  );

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    },
  };
}
