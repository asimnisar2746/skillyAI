import { DashboardNavbar } from "@/components/dashboard/dashboardNavbar";
import { getCachedNotifications } from "@/lib/getNotifications";
import { auth } from "@/auth";

export default async function dashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const userId = session!.user!.id!;

  const notifications = await getCachedNotifications(userId);
  return (
    <>
      <DashboardNavbar notifications={notifications} />
      {children}
    </>
  );
}
