// src/components/ProfileEditForm.tsx
"use client";

import { useState } from "react";
import { updateProfile } from "@/app/actions/profileActions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { ProfileData } from "@/types/profile";

type ProfileEditFormProps = {
  profile: ProfileData;
  onSuccess: () => void;
  onCancel: () => void;
};

export default function ProfileEditForm({
  profile,
  onSuccess,
  onCancel,
}: ProfileEditFormProps) {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const clientAction = async (formData: FormData) => {
    setIsSubmitting(true);
    const result = await updateProfile(formData);
    if (result.error) {
      toast.error(result.error.message);
    } else {
      toast.success("Profile updated successfully!");
      setAvatarPreview(null);
      onSuccess();
    }
    setIsSubmitting(false);
  };

  return (
    <form action={clientAction} className="grid gap-6 p-4">
      <div className="flex flex-col items-center gap-4">
        {/* Avatar Uploader */}
        <div className="relative w-32 h-32">
          <Image
            src={avatarPreview || profile.avatar_url || "/default-avatar.png"}
            alt="Avatar preview"
            fill
            className="rounded-full object-cover border-4 border-gray-700"
          />
          <Label
            htmlFor="avatar-upload"
            className="absolute -bottom-2 -right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-2 cursor-pointer transition-colors border border-gray-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.38-2.827-2.828z" />
            </svg>
            <span className="sr-only">Change avatar</span>
          </Label>
          <Input
            id="avatar-upload"
            name="avatar"
            type="file"
            className="hidden"
            onChange={handleAvatarChange}
            accept="image/*"
          />
        </div>
      </div>

      {/* Name and Username */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            name="fullName"
            defaultValue={profile.full_name || ""}
            className="bg-gray-800 border-gray-700"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            defaultValue={profile.username || ""}
            className="bg-gray-800 border-gray-700"
          />
        </div>
      </div>

      {/* Fighter Stats */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            name="weight"
            type="number"
            step="0.1"
            defaultValue={profile.fighter_stats?.weight_kg || ""}
            className="bg-gray-800 border-gray-700"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            id="height"
            name="height"
            type="number"
            step="0.1"
            defaultValue={profile.fighter_stats?.height_cm || ""}
            className="bg-gray-800 border-gray-700"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            defaultValue={profile.fighter_stats?.location || ""}
            className="bg-gray-800 border-gray-700"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="style">Fighting Style</Label>
          <Input
            id="style"
            name="style"
            defaultValue={profile.fighter_stats?.style || ""}
            className="bg-gray-800 border-gray-700"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="experience">Experience Level</Label>
          <Select
            name="experience"
            defaultValue={profile.fighter_stats?.experience || "amateur"}
          >
            <SelectTrigger
              id="experience"
              className="w-full bg-gray-800 border-gray-700"
            >
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 text-white border-gray-700">
              <SelectItem value="amateur">Amateur</SelectItem>
              <SelectItem value="pro">Pro</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
          className="bg-gray-700 text-white hover:bg-gray-600 border-gray-600"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-red-600 hover:bg-red-700"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
