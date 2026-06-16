"use client";

import useLogIn from "@/hooks/Auth/useLogIn/useLogIn";
import styles from "./Auth.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import GoogleBtnLogIn from "../../../components/googleBtnLogIn/GoogleBtnLogIn";

export default function LoginForm() {
  const {
    showPassword,
    setShowPassword,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
  } = useLogIn();

  return (
    <>
      <p className={styles.auth__prompt}>
        Ви можете авторизуватися за допомогою акаунта Google
      </p>

      <GoogleBtnLogIn />

      <p className={styles.auth__promptSmall}>
        Або увійти за допомогою ел. пошти та паролю
      </p>

      <form className={styles.auth__form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.auth__inputGroup}>
          <label className={styles.auth__label}>Електронна пошта:</label>
          <input
            className={styles.auth__input}
            type="email"
            placeholder="your@email.com"
            {...register("email")}
          />
          {errors.email && (
            <div className={styles.auth__error}>{errors.email.message}</div>
          )}
        </div>

        <div className={styles.auth__inputGroup}>
          <label className={styles.auth__label}>Пароль:</label>
          <div className={styles.auth__passwordWrapper}>
            <input
              className={styles.auth__input}
              type={showPassword ? "text" : "password"}
              placeholder="Пароль"
              {...register("password")}
            />
            <button
              type="button"
              className={styles.auth__passwordToggle}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <AnimatePresence mode="wait" initial={false}>
                {showPassword ? (
                  <motion.svg
                    key="eye-off"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="currentColor"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </motion.svg>
                ) : (
                  <motion.svg
                    key="eye-open"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="currentColor"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </button>
          </div>
          {errors.password && (
            <div className={styles.auth__error}>{errors.password.message}</div>
          )}
        </div>

        <div className={styles.auth__btnGroup}>
          <button
            className={styles.auth__btnLogin}
            type="submit"
            disabled={isSubmitting}
          >
            УВІЙТИ
          </button>
        </div>

        <p className={styles.auth__promptSmall}>
          Немає акаунту?
          <Link href="/register" className={styles.auth__regLink}>
            Зареєструйтеся
          </Link>
        </p>
      </form>
    </>
  );
}
