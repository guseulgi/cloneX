import style from "./search.module.css";
import BackButton from "@/app/(afterLogin)/_component/Backbutton";
import SearchForm from "@/app/(afterLogin)/_component/SearchForm";
import Post from "@/app/(afterLogin)/_component/Post";
import Tab from "./_component/Tab";
import SearchResult from "./_component/SerchResult";

type Props = {
  searchParams: { q: string; f?: string; pf?: string };
};

export default function Search({ searchParams }: Props) {
  return (
    <main className={style.main}>
      <div className={style.searchTop}>
        <div className={style.searchZone}>
          <div className={style.buttonZone}>
            <BackButton />
          </div>
          <div className={style.formZone}>
            <SearchForm q={searchParams.q} />
          </div>
        </div>
        <Tab />
      </div>
      <div className={style.list}>
        <SearchResult searchParams={searchParams} />
      </div>
    </main>
  );
}