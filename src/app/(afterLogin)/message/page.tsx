import style from "./message.module.css";
import Room from "@/app/(afterLogin)/message/_component/Room";

export const metadata = {
  title: "DM / Z",
  description: "X.com 클론 코딩",
};

export default function Home() {
  return (
    <main className={style.main}>
      <div className={style.header}>
        <h3>쪽지</h3>
      </div>
      <Room />
      <Room />
      <Room />
      <Room />
      <Room />
      <Room />
    </main>
  );
}
