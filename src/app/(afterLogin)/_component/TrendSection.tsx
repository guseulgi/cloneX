"use client";

import { usePathname } from "next/navigation";
import style from "./trendSection.module.css";
import Trend from "@/app/(afterLogin)/_component/Trend";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getTrends } from "../_lib/getTrends";
import { IHashtag } from "@/model/IHashtag";

export default function TrendSection() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const { data } = useQuery<IHashtag[]>({
    queryKey: ["trends"],
    queryFn: getTrends,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    enabled: !session?.user,
  });

  if (pathname === "/explore") return null;
  if (session?.user) {
    return (
      <div className={style.trendBg}>
        <div className={style.trend}>
          <h3>나를 위한 트렌드</h3>
          {data?.map((trend: IHashtag) => (
            <Trend trend={trend} key={trend.tagId} />
          ))}
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
