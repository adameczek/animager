import { redirect } from "next/navigation";
import { fetchPetsForDashboard } from "@/app/actions/pet";
import { auth } from "@/auth";
import { EmptyDashboard } from "@/components/EmptyDashboard";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const userId = session.user.id;
  const { pets, pagination } = await fetchPetsForDashboard(userId);

  return (
    <>
      <h1 className="text-2xl font-bold">
        Hi, {session.user?.name || session.user?.email}!
      </h1>

      {pagination.total === 0 && <EmptyDashboard />}
    </>
  );
}
