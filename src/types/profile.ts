export type FighterStats = {
  user_id: string;
  weight_kg: number | null;
  height_cm: number | null;
  style: string | null;
  experience: "amateur" | "pro" | null;
  location: string | null;
  wins: number;
  losses: number;
};

export type ProfileData = {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  fighter_stats: FighterStats | null;
};
