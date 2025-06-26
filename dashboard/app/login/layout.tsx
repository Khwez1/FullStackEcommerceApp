import { redirect } from "next/navigation";
import { cookies } from "next/headers";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function LoginLayout({ children }: DashboardLayoutProps) {
  const token = cookies().get("token")?.value;

  if (!token) {
    return redirect("/login");
  }

  return <div>{children}</div>;
}