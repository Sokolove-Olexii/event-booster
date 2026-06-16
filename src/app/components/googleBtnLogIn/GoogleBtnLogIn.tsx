import styles from "./GoogleBtnLogIn.module.scss";
import GoogleIcon from "../../../../public/icons/googleIcon.svg";
import Image from "next/image";
import useLogIn from "@/hooks/Auth/useLogIn/useLogIn";

export default function GoogleBtnLogIn() {
  const { handleGoogleLogin } = useLogIn();
  return (
    <button
      className={styles.googleBtn}
      onClick={handleGoogleLogin}
      type="button"
    >
      <Image src={GoogleIcon} alt={GoogleIcon} width={18} height={18} />
      Google
    </button>
  );
}
