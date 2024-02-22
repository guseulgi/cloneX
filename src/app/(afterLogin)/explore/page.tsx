import style from "./explore.module.css";
import SearchForm from "../_component/SearchForm";
import TrendSection from "./_component/TrendSection";

export const metadata = {
  title: "검색 / Z",
  description: "X.com 클론 코딩",
};

export default function ExplorePage() {
  return (
    <main className={style.main}>
      <div className={style.formZone}>
        <SearchForm />
      </div>
      <div className={style.trend}>
        <h3>나를 위한 트렌드</h3>
        <TrendSection />
      </div>
    </main>
  );
}
