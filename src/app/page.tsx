import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Layout, MessageSquare, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 md:p-12 bg-[#F9F9F7] relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-60 animate-pulse"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-60 animate-pulse delay-700"></div>

      <main className="max-w-5xl w-full flex flex-col items-center text-center space-y-10 z-10">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/20 bg-primary/5 text-primary font-bold text-sm tracking-tight mb-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <Sparkles className="w-4 h-4" />
          <span>Consultly.io — Your AI Strategist</span>
        </div>
        
        <div className="space-y-6">
          <h1 className="text-6xl md:text-8xl font-display font-black tracking-tight text-[#1A1A1A] leading-[1.05]">
            Map Your Growth. <br />
            <span className="text-primary italic">Forge Your Flow.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg md:text-2xl font-medium leading-relaxed">
            Consultly.io is your strategic partner. We extract your business DNA through deep AI consultation, then forge high-converting funnel mockups directly to your machine.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg justify-center mt-8">
          <Link href="/consultation" className="w-full">
            <Button size="lg" className="w-full text-xl h-16 font-bold bg-primary text-white hover:bg-primary/90 shadow-[0_8px_30px_rgb(79,70,229,0.3)] hover:shadow-none transition-all duration-300 rounded-2xl group">
              Start Strategy Session
              <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-20 pt-20 border-t border-border/50">
          <div className="flex flex-col items-center p-6 space-y-3">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-border">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-bold text-lg">Deep Discovery</h3>
            <p className="text-muted-foreground text-sm">Interactive LLM sessions to map your core offer and audience psychology.</p>
          </div>
          <div className="flex flex-col items-center p-6 space-y-3">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-border">
              <Layout className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-bold text-lg">Visual Mockups</h3>
            <p className="text-muted-foreground text-sm">Beautiful, tech-chic frontend designs tailored to your brand's unique DNA.</p>
          </div>
          <div className="flex flex-col items-center p-6 space-y-3">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-border">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-bold text-lg">Local Assembly</h3>
            <p className="text-muted-foreground text-sm">Export production-grade HTML directly to your specified local directory.</p>
          </div>
        </div>
      </main>
      
      <footer className="mt-20 py-8 text-sm text-muted-foreground font-medium tracking-tight">
        © 2026 CONSULTLY.IO • ALL SYSTEMS NOMINAL
      </footer>
    </div>
  );
}
