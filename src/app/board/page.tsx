import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "src/lib/authOptions";
import BoardList from "./board";
import { SavedLink } from "@utils/interface";

async function getUserData(limit = 0) {
  "use server";
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/sign-in");
  }

  const user = session?.user?.email ?? "";

  const res = await fetch(`${process.env.URL}/api/${user}?limit=${limit}`, {
    next: { tags: ["all_links"] },
  });

  const data = await res.json();

  let categories = [];

  for (let i: number = 0; i < data.result.data.length; ++i) {
    const _data = data.result.data[i]?.category;

    if (_data !== undefined) categories.push("");

    data.result.data[i].categories.forEach((data: string) => {
      categories.push(data);
    });
  }

  categories = [...new Set(categories)];

  return {
    name: user,
    data: data.result.data,
    categories,
    total: data.result.totalPosts,
  };
}

const Dashboard = async () => {
  const data: {
    name: string;
    data: SavedLink[];
    categories: string[];
    total: number;
  } = await getUserData();

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

  return <BoardList data={data} getUserData={getUserData} total={data.total} />;
};
export default Dashboard;
