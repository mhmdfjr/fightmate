// src/app/page.tsx

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import FighterStack from "@/components/FighterStack";

export default async function FighterHome() {
  const supabase = createClient();

  // 1. Get the current logged-in user's session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 2. If no user is logged in, protect the page by redirecting to the login screen
  if (!user) {
    return redirect("/login");
  }

  // 3. Fetch all profiles that are 'fighters', are not the current user,
  //    and are guaranteed to have an entry in the 'fighter_stats' table.
  const { data: fighters, error } = await supabase
    .from("profiles")
    .select(
      `
      id,
      username,
      avatar_url,
      fighter_stats!inner( weight_kg, height_cm, style )
    `
    ) // The !inner join is crucial to ensure stats data is present
    .eq("role", "fighter") // Only show other fighters
    .neq("id", user.id); // Do not show the user their own profile

  // 4. Handle any potential errors during the database query
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

  // 5. Render the page, passing the fetched data to the interactive client component
  return (
    <main className="flex flex-col items-center h-dvh justify-center bg-gradient-to-br from-gray-900 to-black p-4">
      <div className="w-full max-w-md h-[600px] relative">
        <h1 className="text-white text-3xl font-bold text-center mb-4">
          Discover Fighters
        </h1>
        {fighters && fighters.length > 0 ? (
          // If fighters are found, render the interactive swipe stack
          <FighterStack fighters={fighters} currentUserId={user.id} />
        ) : (
          // If no fighters are found, show a helpful message
          <div className="text-center text-gray-400 p-8 bg-gray-900 rounded-lg">
            <p className="text-lg">No New Fighters Found</p>
            <p className="text-sm">Check back later!</p>
          </div>
        )}
      </div>
    </main>
  );
}
