import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Swords,
  CalendarCheck,
  BarChart,
  Users,
  Trophy,
  Target,
  ArrowRight,
  Play,
  Star,
} from "lucide-react";
import ContactForm from "@/components/ContactForm";

export default function FightMatePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative min-h-screen grid-pattern hero-gradient pt-24 sm:pt-10">
        <div className="container mx-auto px-4 h-full flex items-center py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left Content */}
            <div className="space-y-6 text-center lg:text-left">
              <Badge variant="secondary" className="w-fit mx-auto lg:mx-0">
                <Play className="h-3 w-3 mr-1" />
                Now Live
              </Badge>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight text-balance">
                  This is <span className="text-accent">Tinder</span> but
                  <span className="block">Not for Date,</span>
                  It&apos;s for <span className="text-accent">Fighting</span>
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
                  Connect with fighters worldwide. Match based on skill, weight,
                  and location. Schedule fights and build your legacy.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href={"/signup"}
                  className="bg-accent font-bold hover:bg-accent/90 flex gap-x-2 rounded-lg justify-center items-center text-accent-foreground px-4 py-3"
                >
                  <span>Start Fighting</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  href={"#stats"}
                  className="bg-transparent font-bold border-2 hover:border-accent border-muted-foreground flex gap-x-2 rounded-lg justify-center items-center text-muted-foreground hover:text-accent px-4 py-3"
                >
                  <span>Learn More</span>
                </Link>
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative w-full flex justify-center items-center max-w-md mx-auto lg:max-w-none">
              <div className="aspect-square bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl absolute inset-0"></div>
              <div className="relative w-4/5 aspect-square rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://iirisdliaeibufdwospb.supabase.co/storage/v1/object/public/avatars/landing/hero-fightmate.jpg"
                  alt="Fighters in combat"
                  fill={true}
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 border-t border-border" id="stats">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="bg-card border-border hover:border-accent hover:shadow-lg transition-all">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-accent mb-2">
                  10K+
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Active Fighters
                </div>
                <Users className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mt-4 text-muted-foreground" />
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:border-accent hover:shadow-lg transition-all">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-accent mb-2">
                  50K+
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Matches Made
                </div>
                <Target className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mt-4 text-muted-foreground" />
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:border-accent hover:shadow-lg transition-all">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-accent mb-2">
                  25K+
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Fights Completed
                </div>
                <Trophy className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mt-4 text-muted-foreground" />
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:border-accent hover:shadow-lg transition-all">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-accent mb-2">
                  4.9
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Average Rating
                </div>
                <Star className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mt-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20 md:py-32 grid-pattern">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-balance">
              Three steps to your next fight
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform makes it simple to find, match, and fight with
              opponents at your level.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <Card className="bg-card border-border hover:border-accent hover:shadow-lg transition-all h-full">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold text-lg">
                      1
                    </div>
                    <Swords className="h-8 w-8 text-accent" />
                  </div>

                  <h3 className="text-2xl font-bold mb-4">Match & Connect</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Browse fighter profiles filtered by weight class, experience
                    level, and location. Swipe right to show interest, and when
                    they swipe back, it&apos;s a match.
                  </p>

                  <div className="relative w-full h-[300px] mx-auto rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="https://iirisdliaeibufdwospb.supabase.co/storage/v1/object/public/avatars/landing/UFC-glove-touch.jpg"
                      alt="Fighter matching interface"
                      fill={true}
                      objectFit="cover"
                      className="w-full rounded-lg"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Step 2 */}
            <div className="relative lg:mt-12">
              <Card className="bg-card border-border hover:border-accent hover:shadow-lg transition-all h-full">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold text-lg">
                      2
                    </div>
                    <CalendarCheck className="h-8 w-8 text-accent" />
                  </div>

                  <h3 className="text-2xl font-bold mb-4">Schedule & Plan</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Use our secure chat to discuss fight details. Choose date,
                    location, rules, and select from our network of certified
                    referees and venues.
                  </p>

                  <div className="relative w-full h-[300px] mx-auto rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="https://iirisdliaeibufdwospb.supabase.co/storage/v1/object/public/avatars/landing/schedule.webp"
                      alt="Fight scheduling interface"
                      fill={true}
                      objectFit="cover"
                      className="w-full rounded-lg"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <Card className="bg-card border-border hover:border-accent hover:shadow-lg transition-all h-full">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-bold text-lg">
                      3
                    </div>
                    <BarChart className="h-8 w-8 text-accent" />
                  </div>

                  <h3 className="text-2xl font-bold mb-4">Fight & Track</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Step into the ring with confidence. After the fight,
                    referees submit official results that build your permanent
                    fight record and ranking.
                  </p>

                  <div className="relative w-full h-[300px] mx-auto rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="https://iirisdliaeibufdwospb.supabase.co/storage/v1/object/public/avatars/landing/win.webp"
                      alt="Fighter statistics dashboard"
                      fill={true}
                      objectFit="cover"
                      className="w-full rounded-lg"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Showcase */}
      <section className="py-16 sm:py-20 md:py-32 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-balance">
                Built for serious fighters
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-2 h-2 bg-accent rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Verified Fighter Profiles
                    </h3>
                    <p className="text-muted-foreground">
                      Every fighter goes through identity verification and skill
                      assessment.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-2 h-2 bg-accent rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Certified Referees
                    </h3>
                    <p className="text-muted-foreground">
                      All fights are officiated by licensed, experienced
                      referees.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-2 h-2 bg-accent rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Secure Payments
                    </h3>
                    <p className="text-muted-foreground">
                      Built-in escrow system for fight purses and venue
                      bookings.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-2 h-2 bg-accent rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Live Streaming
                    </h3>
                    <p className="text-muted-foreground">
                      Stream your fights live to build your fanbase and earn
                      revenue.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-first lg:order-last relative w-full aspect-video sm:aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="https://iirisdliaeibufdwospb.supabase.co/storage/v1/object/public/avatars/landing/iliaaa.jpg"
                alt="Professional fighting arena"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 grid-pattern">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-bold mb-8 text-balance">
              Ready to step into the ring?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Join thousands of fighters who trust FightMate to find their next
              opponent. Create your profile in minutes and start your journey
              today.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href={"/signup"}
                className="bg-accent font-bold hover:bg-accent/90 flex gap-x-2 rounded-lg justify-center items-center text-accent-foreground text-lg px-4 py-3"
              >
                <span> Create Fighter Profile</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href={"#stats"}
                className="bg-transparent font-bold scroll-smooth border-2 hover:border-accent border-muted-foreground flex gap-x-2 rounded-lg justify-center items-center text-muted-foreground hover:text-accent text-lg px-4 py-3"
              >
                <span>Learn More</span>
                <Play className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
              <p className="text-xl text-muted-foreground">
                Have questions about FightMate? Our team is here to help you get
                started.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">
                    Why Choose FightMate?
                  </h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                      Largest network of verified fighters
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                      Professional referee network
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                      Secure payment processing
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                      24/7 customer support
                    </li>
                  </ul>
                </div>

                <div className="p-6 bg-card border border-border rounded-lg">
                  <h4 className="font-semibold mb-2">Need immediate help?</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our support team is available 24/7 for urgent inquiries.
                  </p>
                  <Button variant="outline" size="sm">
                    Live Chat Support
                  </Button>
                </div>
              </div>

              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Swords className="h-6 w-6 text-accent" />
              <span className="text-xl font-bold">FightMate</span>
            </div>

            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <Link
                href="/privacy"
                className="hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/support"
                className="hover:text-foreground transition-colors"
              >
                Support
              </Link>
            </div>

            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} FightMate. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
