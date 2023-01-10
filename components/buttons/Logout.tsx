import { ExitIcon } from "@radix-ui/react-icons";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

const Logout = () => {
  const router = useRouter();
  const handleSignOut = async (e: { preventDefault: () => void }) => {
    const data = await signOut({ redirect: false, callbackUrl: "/" });
    e.preventDefault();
    router.push(data.url);
    // router.replace('/')
  };
  return (
    <div>
      <a onClick={handleSignOut}>
        <ExitIcon width={20} height={20} />
      </a>
    </div>
  );
};

export default Logout;
