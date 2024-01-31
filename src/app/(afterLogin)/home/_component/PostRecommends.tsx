"use client";

import { useQuery } from "@tanstack/react-query";
import getPostRecommands from "../_lib/getPostRecommends";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";

export default function PostRecommends() {
  const { data } = useQuery<IPost[]>({
    queryKey: ["posts", "recommends"],
    queryFn: getPostRecommands,
    staleTime: 60 * 1000, // 1분
    gcTime: 5 * 60 * 1000,
  });

  return data?.map((post: IPost) => <Post key={post.postId} post={post} />);
}
