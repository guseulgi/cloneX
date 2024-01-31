import { useQuery } from "@tanstack/react-query";
import getFollowingPosts from "../_lib/getFollowingPosts";
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from "@/model/Post";

export default function FollowingPosts() {
  const { data } = useQuery({
    queryKey: ["posts", "followings"],
    queryFn: getFollowingPosts,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  return data?.map((post: IPost) => <Post key={post.postId} post={post} />);
}
