import { ReactNode } from "react";
import ProfileMenu from "@/components/ProfileMenu";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

function authCheck() {
  const cookieStore = cookies();
  if (!cookieStore.has("sessionToken")) return redirect("/");
}

export default function ProfileLayout({ children }: { children: ReactNode }) {
  authCheck();
  return (
    <div className="pt-[72px] profile-page flex flex-col">
      <ProfileMenu />
      {children}
    </div>
  );
}
