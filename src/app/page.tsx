import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "src/lib/authOptions";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/board");
  }
  if (!session) {
    redirect("/sign-in");
  }

  return <p>Boo!</p>;
}
