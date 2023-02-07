import type { GetServerSidePropsContext, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { dehydrate, QueryClient } from "react-query";
import styles from "@styles/categories.module.css";
import { useDataGetter, userLinks } from "@utils/api";
import { authOptions } from "@api/auth/[...nextauth]";

const Categories = () => {
  const { data: session, status } = useSession();
  const name: string = session?.user?.email!;

  function useLinks() {
    const { isLoading, error, data } = useDataGetter(name);

    return {
      data,
      error,
      isLoading,
    };
  }

  const storedData = useLinks();
  // console.log("stored data", storedData?.data?.data)
  const data = storedData?.data?.data!;
  const isLoading = storedData.isLoading;

  // if(data) console.log("data", data)
  const categories: string[] = [];

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
    for (let i = 0; i < data.length; ++i) {
      categories.push(data[i].category);
    }
    const allcategories = [...new Set(categories)];
    // console.log("catts", allcategories)

    return (
      <div className={styles.container}>
        <div className={styles.categories}>
          {allcategories?.map((data) => (
            <Link key={data} href={`/v1/${name}/category/${data}`}>
              <div className={styles.category_cards}>
                <h1>{data}</h1>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
};

export default Categories;

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
