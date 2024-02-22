import BackButton from "@/app/(afterLogin)/_component/Backbutton";
import style from "./singlePost.module.css";
import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm";
import SinglePost from "@/app/(afterLogin)/[username]/status/[id]/_component/SinglePost";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getComments } from "./_lib/getComments";
import Comments from "./_component/Comments";
import { getUserServer } from "../../_lib/getUserServer";
import { getSinglePostServer } from "./_lib/getSinglePostServer";
import { User } from "@/model/User";
import { Post } from "@/model/Post";

type Props = {
  params: { id: string; username: string };
};

export async function generateMetadata({ params }: Props) {
  const user: User = await getUserServer({
    queryKey: ["users", params.username],
  });
  const post: Post = await getSinglePostServer({
    queryKey: ["posts", params.id],
  });
  return {
    title: `Z에서 ${user.nickname} 님 : ${post.content}`,
    description: post.content,
    test: "테스트 태그",
  };
}

export default async function Page({ params }: Props) {
  const { id } = params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["posts", id],
    queryFn: getSinglePostServer,
  });
  await queryClient.prefetchQuery({
    queryKey: ["posts", id, "comments"],
    queryFn: getComments,
  });

  const dehydreatedState = dehydrate(queryClient);

  return (
    <div className={style.main}>
      <HydrationBoundary state={dehydreatedState}>
        <div className={style.header}>
          <BackButton />
          <h3 className={style.headerTitle}>게시하기</h3>
        </div>
        <SinglePost id={id} />
        <CommentForm id={id} />
        <div>
          <Comments id={id} />
        </div>
      </HydrationBoundary>
    </div>
  );
}
