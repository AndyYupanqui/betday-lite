import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ProfileClient } from "./ProfileClient";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login?callbackUrl=/profile");

  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/matches`, { method: "GET", headers: { "Content-Type": "application/json" } });
  const data = await res.json();

  return (
    <div className="max-w-2xl mx-auto px-4 pt-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand to-blue-400 flex items-center justify-center text-black font-black text-lg">
            {session.user?.name?.slice(0, 1).toUpperCase() ?? "U"}
          </div>
          <div>
            <p className="text-gray-400 text-sm">Bienvenido de vuelta</p>
            <h1 className="text-2xl font-black text-white">{session.user?.name ?? "Usuario"}</h1>
          </div>
        </div>
        <p className="text-gray-500 text-sm">{session.user?.email}</p>
      </div>

      <ProfileClient betsMatched={data.matches} />
    </div>
  );
}
