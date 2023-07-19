import List from "@components/lists";
import Dialog from "@components/dialog";
import styles from "@styles/dashboard.module.css";
import { getServerSession } from "next-auth/next";
import { GetServerSidePropsContext, NextPage } from "next";
import { dehydrate, QueryClient } from "react-query";
import { useSession } from "next-auth/react";
import { listCategories, useDataGetter, userLinks } from "@utils/api";
import { authOptions } from "@api/auth/[...nextauth]";
import { useRouter } from "next/router";
import { CabinetGrotesk } from "@utils/font";
import Nolinks from "@components/ui/nolinks";

const Dashboard: NextPage = () => {
  const { replace } = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      replace("/signin");
    },
  });
  const name: string = session?.user?.email!;

  //getting user's data from db
  const { isLoading, error, data: stored_data } = useDataGetter(name);

  async function getCategories() {
    const data = await listCategories(name);
    console.log("categs", data);
  }

  if (isLoading || stored_data === undefined)
    return (
      <div className="loading_container">
        <div className="lds_ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    );

  getCategories();
  return (
    <div className={styles.container}>
      {stored_data.length === 0 ? (
        <Nolinks />
      ) : (
        <main className={styles.main}>
          <section>
            <List name={name} savedlinks={stored_data} />
          </section>
        </main>
      )}

      <footer className={styles.footer}>
        <Dialog
          name={name}
          isLoading={isLoading}
          error={error}
          storedData={stored_data}
        />
      </footer>
    </div>
  );
};

export default Dashboard;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("links", () =>
    userLinks(session?.user?.email!)
  );

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    },
  };
}
