import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import FighterStack from "@/components/FighterStack";
import { ProfileData } from "@/types/profile";

export default async function FighterHome() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data, error } = await supabase
    .from("profiles")
    .select(
      `
    id,
    username,
    full_name,
    avatar_url,
    fighter_stats (
      user_id,
      weight_kg,
      height_cm,
      style,
      location,
      experience,
      wins,
      losses
    )
  `
    )
    .eq("role", "fighter")
    .neq("id", user.id);

  if (error) {
    console.error("Error fetching fighters:", error);
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black p-4">
        <p className="text-red-400">
          Could not load fighters. Please try again later.
        </p>
      </main>
    );
  }

  const fighters = (data ?? []).map((f) => ({
    ...f,
    fighter_stats: Array.isArray(f.fighter_stats)
      ? f.fighter_stats[0] ?? null
      : f.fighter_stats ?? null,
  })) as ProfileData[];

  console.log("Fetched fighters:", fighters);

  return (
    <main className="flex flex-col items-center h-dvh justify-center bg-gradient-to-br from-gray-900 to-black p-4">
      <div className="w-full max-w-md h-[600px] relative">
        <h1 className="text-white text-3xl font-bold text-center mb-4">
          Discover Fighters
        </h1>
        {fighters && fighters.length > 0 ? (
          <FighterStack fighters={fighters} currentUserId={user.id} />
        ) : (
          <div className="text-center text-gray-400 p-8 bg-gray-900 rounded-lg">
            <p className="text-lg">No New Fighters Found</p>
            <p className="text-sm">Check back later!</p>
          </div>
        )}
      </div>
    </main>
  );
}
