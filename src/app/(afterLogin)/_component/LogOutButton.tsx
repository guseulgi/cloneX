'use client';

import { signOut, useSession } from 'next-auth/react';
import style from './logoutButton.module.css';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();
  const { data: me } = useSession(); // 내 정보 바꿔치기 가능

  const onLogout = () => {
    signOut({ redirect: false }).then(() => {
      router.replace('/');
    });
  };

  if (!me?.user) return null;

  return (
    <button className={style.logOutButton} onClick={onLogout}>
      <div className={style.logOutUserImage}>
        <img src={me.user?.image!} alt={me.user?.email as string} />
      </div>
      <div className={style.logOutUserName}>
        <div>{me.user?.name}</div>
        <div>@{me.user?.email}</div>
      </div>
    </button>
  );
}
