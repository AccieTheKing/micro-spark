"use client";
import { Button } from "~/components/ui/button";
import { ArrowRight, Sparkles, MessageSquare } from "lucide-react";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <header className="border-border border-b">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <Sparkles className="text-primary h-6 w-6" />
            <h1 className="text-foreground text-xl font-bold">Micro Spark</h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex justify-center">
            <div className="bg-primary/10 rounded-full p-4">
              <Sparkles className="text-primary h-12 w-12" />
            </div>
          </div>

          <h1 className="text-foreground mb-6 text-5xl font-bold">
            Welcome to <span className="text-primary">Micro Spark</span>
          </h1>

          <p className="text-muted-foreground mb-8 text-xl leading-relaxed">
            The fastest way to build Most Valuable Products (MVP&apos;s).
            <br /> Get responses to spark new ideas with our powerful interface.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/questions">
              <Button size="lg" className="px-8 py-6 text-lg">
                Start Chatting
                <MessageSquare className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 py-6 text-lg">
              Learn More
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-border border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Sparkles className="text-primary h-5 w-5" />
            <span className="text-foreground font-semibold">Micro Spark</span>
          </div>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Micro Spark. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
