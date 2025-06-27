import { redirect } from "next/navigation";
import { cookies } from "next/headers";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function LoginLayout({ children }: DashboardLayoutProps) {
  const token = cookies().get("token")?.value;

  if (token) {
    return redirect("/dashboard");
  }

  return <div>{children}</div>;
}