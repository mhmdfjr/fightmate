// src/components/FighterStack.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { handleSwipe } from "@/app/actions/swipeActions";
import { toast } from "sonner";
import Image from "next/image"; // Make sure Image is imported

// The type is updated to include avatar_url
type FighterProfile = {
  id: string;
  username: string | null;
  avatar_url: string | null; // Added for the profile image
  fighter_stats: {
    weight_kg: number | null;
    height_cm: number | null;
    style: string | null;
  } | null;
};

type FighterStackProps = {
  fighters: FighterProfile[];
  currentUserId: string;
};

const swipeThreshold = 100;

export default function FighterStack({
  fighters,
  currentUserId,
}: FighterStackProps) {
  const [fighterList, setFighterList] = useState(fighters);

  const handleDragEnd = async (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
    swipedUserId: string
  ) => {
    const swipeDistance = info.offset.x;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      const direction = swipeDistance > 0 ? "right" : "left";
      const liked = direction === "right";

      setFighterList((prev) =>
        prev.filter((fighter) => fighter.id !== swipedUserId)
      );

      const result = await handleSwipe(currentUserId, swipedUserId, liked);

      if (result?.match) {
        toast.success("It's a Match!", {
          description: "You can now message this fighter.",
          duration: 5000,
        });
      }
    }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <AnimatePresence>
        {fighterList.map(
          (fighter, index) =>
            index === fighterList.length - 1 && (
              <motion.div
                key={fighter.id}
                drag="x"
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                onDragEnd={(event, info) =>
                  handleDragEnd(event, info, fighter.id)
                }
                className="absolute cursor-grab"
                initial={{ scale: 0.95, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{
                  x: (info: { offset: { x: number } }) =>
                    info.offset.x > 0 ? 300 : -300,
                  opacity: 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative w-[320px] h-[500px] rounded-xl bg-gray-800 border-2 border-gray-700 shadow-lg p-6 flex flex-col justify-end overflow-hidden">
                  {/* --- IMAGE ADDED HERE --- */}
                  {fighter.avatar_url && (
                    <Image
                      src={fighter.avatar_url}
                      alt={`Profile image of ${fighter.username}`}
                      fill // This makes the image fill the parent div
                      className="object-cover" // Ensures the image covers the area without stretching
                      priority={true} // Prioritize loading the top card's image
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/0"></div>
                  <div className="relative z-10 text-white">
                    <h2 className="text-4xl font-bold">{fighter.username}</h2>
                    <p className="text-lg text-gray-300">
                      {fighter.fighter_stats?.style || "Unknown Style"}
                    </p>
                    <div className="flex space-x-4 mt-2 text-gray-400">
                      <span>{fighter.fighter_stats?.weight_kg || "--"} kg</span>
                      <span>{fighter.fighter_stats?.height_cm || "--"} cm</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
        )}
      </AnimatePresence>
    </div>
  );
}
