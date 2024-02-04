"use client";

import { useQuery } from "@tanstack/react-query";
import BackButton from "../../_component/Backbutton";
import style from "../profile.module.css";
import { getUser } from "../_lib/getUser";
import { User } from "@/model/User";

type Props = {
  username: string;
};
export default function UserInfo({ username }: Props) {
  const { data: user, error } = useQuery<
    User,
    Object,
    User,
    [_1: string, _2: string]
  >({
    queryKey: ["users", username],
    queryFn: getUser,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  if (error) {
    return (
      <>
        <div className={style.header}>
          <BackButton />
          <h3 className={style.headerTitle}>프로필</h3>
        </div>
        <div className={style.userZone}>
          <div className={style.userImage}></div>
          <div className={style.userName}>
            <div>@{username}</div>
          </div>
          <div
            style={{
              height: 100,
              alignItems: "center",
              fontSize: 31,
              fontWeight: "bold",
              justifyContent: "center",
              display: "flex",
            }}
          >
            계정이 존재하지 않음
          </div>{" "}
        </div>
      </>
    );
  }

  if (!user) return null;

  return (
    <>
      <div className={style.header}>
        <BackButton />
        <h3 className={style.headerTitle}>{user.nickname}</h3>
      </div>
      <div className={style.userZone}>
        <div className={style.userImage}>
          <img src={user.image} alt={user.id} />
        </div>
        <div className={style.userName}>
          <div>{user.nickname}</div>
          <div>@{user.id}</div>
        </div>
        <button className={style.followButton}>팔로우</button>
      </div>
    </>
  );
}
