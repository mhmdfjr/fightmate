export type FighterProfile = {
  id: string;
  username: string;
  avatar_url: string | null;
  fighter_stats: {
    weight_kg: number | null;
    height_cm: number | null;
    style: string | null;
    location: string | null;
    experience: string | null;
  };
};
