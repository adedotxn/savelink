import List from "@components/lists";
import Dialog from "@components/dialog";
import styles from "@styles/dashboard.module.css";
import { getServerSession } from "next-auth/next";
import { GetServerSidePropsContext, NextPage } from "next";
import { dehydrate, QueryClient } from "react-query";
import { useSession } from "next-auth/react";
import { useDataGetter, userLinks } from "@utils/api";
import { authOptions } from "@api/auth/[...nextauth]";
import { useRouter } from "next/router";

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
  const { isLoading, error, data } = useDataGetter(name);
  const stored_data = data?.data;

  if (isLoading)
    return (
      <div className="loading_container">
        <div className="lds_ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    );

  return (
    <div className={styles.container}>
      {stored_data.length === 0 ? (
        <div className={styles.such_nothing}>
          <h2>Such nothing 👀 </h2>
          <p>Click the button to start saving </p>
        </div>
      ) : (
        <main className={styles.main}>
          <section>
            <List name={name} array={stored_data} />
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
