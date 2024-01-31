'use client';

import { usePathname } from 'next/navigation';
import style from './trendSection.module.css';
import Trend from '@/app/(afterLogin)/_component/Trend';
import { useSession } from 'next-auth/react';

export default function TrendSection() {
  const pathname = usePathname();
  if (pathname === '/explore') return null;

  const { data: session } = useSession();
  if (session?.user) {
    return (
      <div className={style.trendBg}>
        <div className={style.trend}>
          <h3>나를 위한 트렌드</h3>
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
          <Trend />
        </div>
      </div>
    );
  } else {
    return (
      <div className={style.trendBg}>
        <div className={style.noTrend}>트랜드를 가져올 수 없습니다</div>
      </div>
    );
  }
}
