import Image from "next/image";
import style from "./page.module.scss"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className={style.main}>Hola</div>
    </main>
  );
}
