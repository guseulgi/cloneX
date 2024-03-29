import style from "./home.module.css";
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import { Suspense } from "react";
import Loading from "@/app/(afterLogin)/home/loading";
import TabDeciderSuspense from "@/app/(afterLogin)/home/_component/TabDeciderSuspense";
import { auth } from "@/auth";

export const metadata = {
  title: "홈 / Z",
  description: "X.com 클론 코딩",
};

export default async function Home() {
  const session = await auth();

  return (
    <main className={style.main}>
      <TabProvider>
        <Tab />
        <PostForm me={session} />
        <Suspense fallback={<Loading />}>
          <TabDeciderSuspense />
        </Suspense>
      </TabProvider>
    </main>
  );
}
