"use client";

import { useQuery } from "@tanstack/react-query";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";
import { getSinglePost } from "../_lib/getSinglePost";

type Props = {
  id: string;
  noImage?: boolean;
};

export default function UserPosts({ id, noImage }: Props) {
  const { data: post, error } = useQuery<
    IPost,
    Object,
    IPost,
    [_1: string, string]
  >({
    queryKey: ["posts", id],
    queryFn: getSinglePost,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  if (error) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  if (!post) {
    return null;
  }
  return <Post key={post.postId} post={post} noImage />;
}