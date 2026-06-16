import styles from "../page.module.scss";
import authStyles from "../components/forms/Auth/Auth.module.scss";
import AsciiBackground from "../components/AsciiBackground/AsciiBackground";
import Image from "next/image";
import EventBoosterLogo from "../../../public/icons/DesktopLogo.svg";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.home}>
      <AsciiBackground />
      <section className={authStyles.auth}>
        <div className={authStyles.auth__position}>
          <div className={authStyles.auth__header}>
            <Image src={EventBoosterLogo} alt="Logo" width={136} height={67} />
          </div>

          <div className={authStyles.auth__card}>{children}</div>
        </div>
      </section>
    </main>
  );
}
