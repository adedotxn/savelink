import { getServerSession } from "next-auth/next";
import styles from "@styles/dashboard.module.css";
import List from "@components/lists";
import { authOptions } from "@api/auth/[...nextauth]";
import { useRouter } from "next/navigation";

async function getBookmarks() {
  const session = await getServerSession(authOptions);
  const user = session?.user?.email;

  const res = await fetch(`http://localhost:3000/api/${user}/bookmarks`);
  const data = await res.json();
  return { name: user, data };
}

const Bookmark = async () => {
  //   const { data: session } = useSession({
  //     required: true,
  //     onUnauthenticated() {
  //       replace("/signin");
  //     },
  //   });

  const data = await getBookmarks();

  //   const { isLoading, error, data } = useQuery({
  //     queryKey: ["bookmarks", name],
  //     queryFn: () => getData(name),
  //   });

  //   if (error) {
  //     if (error instanceof Error) {
  //       console.log("creation error", error.message);
  //     } else {
  //       console.log(`Unexpected error in bookmark page : ${error}`);
  //     }
  //   }

  //   if (isLoading || data === undefined) {
  //     return (
  //       <div className="loading_container">
  //         <div className="lds_ripple">
  //           <div></div>
  //           <div></div>
  //         </div>
  //       </div>
  //     );
  //   }

  if (!data.name || data.name === undefined) {
    return (
      <div className="loading_container">
        <div className="lds_ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section>
          <List name={data.name} savedlinks={data.data} />
        </section>
      </main>
    </div>
  );
};

export default Bookmark;
