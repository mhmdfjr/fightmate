// src/app/(fighter)/layout.tsx
import FighterNavbar from "@/components/FighterNavbar";

export default function FighterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <FighterNavbar />
      <main>{children}</main>
    </div>
  );
}
