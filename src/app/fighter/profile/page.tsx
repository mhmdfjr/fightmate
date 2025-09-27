// src/app/fighter/profile/page.tsx
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { signOut } from "@/app/auth/actions";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EditProfileModal from "@/components/EditProfileModal";
import { ProfileData } from "@/types/profile";
import {
  MapPin,
  Weight,
  Ruler,
  TrendingUp,
  Swords,
  Trophy,
  XCircle,
  LogOut,
} from "lucide-react";

export default async function ProfilePage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select(
      `
    id,
    username,
    full_name,
    avatar_url,
    fighter_stats!inner (
      user_id,
      weight_kg,
      height_cm,
      style,
      experience,
      location,
      wins,
      losses
    )
  `
    )
    .eq("id", user.id)
    .single<ProfileData>();

  if (error || !profile) {
    // Cannot find name 'profile'.
    return (
      <p className="text-white">Could not load profile. {error?.message}</p>
    );
  }

  const fighterStats = profile?.fighter_stats || null;

  return (
    <div className="h-dvh bg-gradient-to-br from-gray-900 to-black text-white p-4 md:p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl grid md:grid-cols-3 gap-8">
        {/* Main Profile Card */}
        <Card className="md:col-span-2 bg-gray-950 text-white border-gray-800 shadow-lg p-6 flex flex-col items-center text-center relative">
          <form action={signOut} className="absolute top-4 right-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Logout</span>
            </Button>
          </form>
          <CardHeader className="w-full">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <Image
                src={profile.avatar_url || "/default-avatar.png"}
                alt={`${profile.username}'s avatar`}
                fill
                className="rounded-full object-cover border-4 border-red-600"
              />
            </div>
            <CardTitle className="text-4xl font-extrabold text-red-500 mb-2">
              {profile.username || "No Username"}
            </CardTitle>
            <CardDescription className="text-xl text-gray-300 mb-4">
              {profile.full_name || "Anonymous Fighter"}
            </CardDescription>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-gray-400 text-sm">
              {fighterStats?.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-red-500" />
                  {fighterStats.location}
                </span>
              )}
              {fighterStats?.weight_kg && (
                <span className="flex items-center gap-1">
                  <Weight className="h-4 w-4 text-red-500" />
                  {fighterStats.weight_kg} kg
                </span>
              )}
              {fighterStats?.height_cm && (
                <span className="flex items-center gap-1">
                  <Ruler className="h-4 w-4 text-red-500" />
                  {fighterStats.height_cm} cm
                </span>
              )}
              {fighterStats?.style && (
                <span className="flex items-center gap-1">
                  <Swords className="h-4 w-4 text-red-500" />
                  {fighterStats.style}
                </span>
              )}
              {fighterStats?.experience && (
                <span className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-red-500" />
                  {fighterStats.experience.charAt(0).toUpperCase() +
                    fighterStats.experience.slice(1)}
                </span>
              )}
            </div>
          </CardHeader>
          <CardContent className="mt-6 w-full">
            {profile && (
              <EditProfileModal profile={profile}>
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  Edit Profile
                </Button>
              </EditProfileModal>
            )}
          </CardContent>
        </Card>

        {/* Fight Record Card */}
        <Card className="md:col-span-1 bg-gray-950 text-white border-gray-800 shadow-lg p-6 flex flex-col items-center text-center">
          <CardHeader className="w-full">
            <CardTitle className="text-2xl font-bold mb-4">
              Fight Record
            </CardTitle>
            <CardDescription className="text-gray-400">
              Your official wins and losses.
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full flex justify-around gap-4 mt-4">
            <div className="flex flex-col items-center">
              <Trophy className="h-8 w-8 text-green-500 mb-2" />
              <p className="text-5xl font-extrabold text-green-500">
                {fighterStats?.wins || 0}
              </p>
              <p className="text-lg text-gray-400">Wins</p>
            </div>
            <div className="flex flex-col items-center">
              <XCircle className="h-8 w-8 text-red-500 mb-2" />
              <p className="text-5xl font-extrabold text-red-500">
                {fighterStats?.losses || 0}
              </p>
              <p className="text-lg text-gray-400">Losses</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
