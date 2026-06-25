import AuthGuard from "../components/auth/AuthGuard";
import styles from "./dashboard.module.scss";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <main className={styles.dashboardLayout}>{children}</main>
    </AuthGuard>
  );
}