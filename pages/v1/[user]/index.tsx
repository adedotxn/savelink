import List from "../../../components/lists";
import styles from "../../../styles/dashboard.module.css";
import { GetServerSidePropsContext, NextPage } from "next";
import { dehydrate, QueryClient } from "react-query";
import { userLinks, useDataGetter, useCreate } from "../../../utils/api/api";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { authOptions } from "../../api/auth/[...nextauth]";
import { useDialog } from "../../../utils/helpers/context";
import { Toaster } from "react-hot-toast";
import AddSvg from "../../../components/svg/add";

import CustomDialog from "../../../components/dialog";
const Dashboard: NextPage = () => {
  const { toggleDialog } = useDialog();
  const { data: session } = useSession();
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
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      {stored_data.length === 0 ? (
        <div className={styles.such_nothing}>
          <h2>Such nothing 👀 </h2>
          <p>Click the button to start saving </p>
        </div>
      ) : (
        <main className={styles.main}>
          <section>
            <List array={stored_data} />
          </section>
        </main>
      )}

      <div>
        <CustomDialog
          name={name}
          isLoading={isLoading}
          error={error}
          storedData={stored_data}
        />
      </div>

      <footer className={styles.footer}>
        <div className={styles.desktop_footer}>
          <div onClick={toggleDialog} className={styles.add}>
            <div className={styles.cr8}>
              <AddSvg />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("links", () =>
    userLinks(session?.user?.email!)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
