import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Play } from "lucide-react";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = await searchParams;

  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return redirect("/login?message=Could not find user session");
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role === "fighter") {
      return redirect("/fighter");
    } else if (profile?.role === "referee") {
      return redirect("/referee");
    } else if (profile?.role === "admin") {
      return redirect("/admin");
    }

    return redirect("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen grid-pattern hero-gradient p-4 pt-24 sm:pt-4">
      <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm text-foreground border-border shadow-2xl">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl font-bold text-center text-balance">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Sign in to continue your fight journey.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            {resolvedSearchParams?.message && (
              <Alert variant="destructive">
                <Play className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {resolvedSearchParams.message}
                </AlertDescription>
              </Alert>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
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
            <Button
              formAction={signIn}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg py-3 mt-2 rounded-lg"
            >
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="w-full text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-accent hover:underline font-semibold"
            >
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
