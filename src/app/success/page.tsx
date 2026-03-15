"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Home, FolderCheck, ArrowRight } from "lucide-react";

export default function SuccessPage() {
  const [targetPath, setTargetPath] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("funnelSuccess");
    if (data) setTargetPath(JSON.parse(data).path);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F9F7] p-8 relative overflow-hidden text-center">
      <div className="absolute top-0 left-0 w-full h-2 bg-primary"></div>
      
      <main className="max-w-xl w-full flex flex-col items-center space-y-8 z-10 animate-in fade-in zoom-in duration-700">
        <div className="w-24 h-24 bg-primary/10 rounded-[2rem] flex items-center justify-center border border-primary/20">
          <CheckCircle2 className="w-12 h-12 text-primary" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight text-[#1A1A1A]">
            Sequence Complete.
          </h1>
          <p className="text-muted-foreground text-lg font-medium leading-relaxed">
            Your high-converting funnel engine has been successfully forged and delivered.
          </p>
        </div>

        <div className="w-full bg-white border border-border p-8 rounded-[2rem] text-left space-y-6 shadow-sm">
          <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-primary">
            <FolderCheck className="w-5 h-5" /> Retrieval Manifest
          </div>
          
          <div className="space-y-4 text-sm font-medium text-muted-foreground/80">
            <p>1. Open your terminal or explorer.</p>
            <p>
              2. Navigate to your build directory:<br />
              <code className="text-foreground bg-[#F9F9F7] px-3 py-2 rounded-xl mt-2 block border border-border font-mono break-all">
                {targetPath || "C:\\Consultly\\Project"}
              </code>
            </p>
            <p>
              3. Launch your engine by opening <code className="text-primary font-bold">index.html</code> in any modern browser.
            </p>
          </div>
        </div>

        <Link href="/" className="w-full">
          <Button size="lg" className="w-full text-lg h-16 font-bold bg-primary text-white hover:bg-primary/90 transition-all rounded-2xl shadow-[0_8px_30px_rgb(79,70,229,0.2)]">
            <Home className="mr-2 w-5 h-5" /> New Strategy Session <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </main>
    </div>
  );
}
