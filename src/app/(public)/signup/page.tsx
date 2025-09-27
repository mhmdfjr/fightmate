// src/app/(public)/signup/page.tsx
import { Suspense } from "react";
import SignupForm from "@/components/SignupForm";

// A simple loading component
function Loading() {
  return <div className="text-white">Loading form...</div>;
}

export default function SignupPage() {
  return (
    <div className="flex justify-center items-center min-h-screen grid-pattern hero-gradient p-4 pt-24 sm:pt-4">
      <Suspense fallback={<Loading />}>
        <SignupForm />
      </Suspense>
    </div>
  );
}
