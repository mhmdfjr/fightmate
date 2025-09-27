// src/components/SignupForm.tsx
"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { signup } from "@/app/auth/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Play } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg py-3 mt-2 rounded-lg"
    >
      {pending ? "Creating Account..." : "Sign Up"}
    </Button>
  );
}

export default function SignupForm() {
  const [role, setRole] = useState<"fighter" | "referee">("fighter");
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  return (
    <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm text-foreground border-border shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl sm:text-3xl font-bold text-center text-balance">
          Join FightMate
        </CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          Create your account and enter the arena.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={signup} className="grid gap-4">
          {message && (
            <Alert variant="destructive">
              <Play className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
          {/* Form fields remain the same */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              className="py-3 px-4 text-base"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="py-3 px-4 text-base"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              required
              className="py-3 px-4 text-base"
            />
          </div>
          <div className="grid gap-2">
            <Label>Register as</Label>
            <RadioGroup
              onValueChange={(value) => setRole(value as "fighter" | "referee")}
              defaultValue="fighter"
              name="role"
              className="grid grid-cols-2 gap-2 rounded-lg border border-input p-1"
            >
              <div>
                <RadioGroupItem
                  value="fighter"
                  id="fighter"
                  className="sr-only"
                />
                <Label
                  htmlFor="fighter"
                  className={`flex items-center justify-center p-2 rounded-md cursor-pointer transition-colors ${
                    role === "fighter"
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  Fighter
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="referee"
                  id="referee"
                  className="sr-only"
                />
                <Label
                  htmlFor="referee"
                  className={`flex items-center justify-center p-2 rounded-md cursor-pointer transition-colors ${
                    role === "referee"
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  Referee
                </Label>
              </div>
            </RadioGroup>
          </div>
          {role === "fighter" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="weight_kg">Weight (kg)</Label>
                <Input
                  id="weight_kg"
                  name="weight_kg"
                  type="number"
                  required
                  className="py-3 px-4 text-base"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="height_cm">Height (cm)</Label>
                <Input
                  id="height_cm"
                  name="height_cm"
                  type="number"
                  required
                  className="py-3 px-4 text-base"
                />
              </div>
            </div>
          )}
          {role === "referee" && (
            <div className="grid gap-2">
              <Label htmlFor="certification_details">Certification</Label>
              <Input
                id="certification_details"
                name="certification_details"
                type="text"
                required
                className="py-3 px-4 text-base"
              />
            </div>
          )}
          <SubmitButton />
        </form>
      </CardContent>
      <CardFooter>
        <p className="w-full text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-accent hover:underline font-semibold"
          >
            Log In
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
