"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProfileEditForm from "./ProfileEditForm";
import { useState } from "react";
import { ProfileData } from "@/types/profile";

type EditProfileModalProps = {
  profile: ProfileData;
  children: React.ReactNode;
};

export default function EditProfileModal({
  profile,
  children,
}: EditProfileModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccess = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[700px] bg-gray-900 text-white border-gray-800 max-h-[90dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.{" "}
          </DialogDescription>
        </DialogHeader>
        <ProfileEditForm
          profile={profile}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
}
