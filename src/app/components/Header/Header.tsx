import styles from "./Header.module.scss";
import Image from "next/image";
import ProfileIcon from "../../../../public/icons/profileIcon.svg";

export default function Header() {
  return (
    <section className={styles.header}>
      <Image src={ProfileIcon} alt="ProfileIcon" width={15} height={15} />
    </section>
  );
}
