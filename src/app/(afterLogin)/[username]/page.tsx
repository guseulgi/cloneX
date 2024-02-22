import style from "./profile.module.css";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getUserServer } from "./_lib/getUserServer";
import { getUserPosts } from "./_lib/getUserPosts";
import UserPosts from "./_component/UserPosts";
import UserInfo from "./_component/UserInfo";
import { auth } from "@/auth";

import { User } from "@/model/User";

type Props = { params: { username: string } };

export async function generateMetadata({ params }: Props) {
  const user: User = await getUserServer({
    queryKey: ["users", params.username],
  });
  return {
    title: `${user.nickname} (${user.id}) / Z`,
    description: `${user.nickname} (${user.id}) 프로필`,
    openGraph: {
      title: `${user.nickname} (${user.id}) / Z`,
      description: `${user.nickname} (${user.id}) 프로필`,
      images: [
        { url: `https://domian.com${user.image}`, width: 400, height: 400 },
      ],
    },
  };
}

export default async function Profile({ params }: Props) {
  const { username } = params;
  const session = await auth();

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["users", username],
    queryFn: getUserServer,
  });
  await queryClient.prefetchQuery({
    queryKey: ["posts", "users", username],
    queryFn: getUserPosts,
  });

  const dehydretedState = dehydrate(queryClient);

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydretedState}>
        <UserInfo username={username} session={session} />
        <div>
          <UserPosts username={username} />
        </div>
      </HydrationBoundary>
    </main>
  );
}
