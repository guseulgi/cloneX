'use client';

import { useRouter } from 'next/navigation';
import Main from '@/app/(beforeLogin)/_component/Main';
import { useSession } from 'next-auth/react';

export default function LoginPage() {
  const router = useRouter();
  const { data: session } = useSession();

  if (session?.user) {
    router.replace('/home');
  } else router.replace('i/flow/login');

  return <Main />;
}
