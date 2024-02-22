import styles from "@/app/(beforeLogin)/_component/main.module.css";

type Props = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export const metadata = {
  title: "무슨 일이 일어나고 있나요?",
  description: "X.com 클론 코딩",
};

export default function BeforeLoginLayout({ children, modal }: Props) {
  return (
    <div className={styles.container}>
      {children}
      {modal}
    </div>
  );
}
