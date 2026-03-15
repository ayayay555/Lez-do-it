"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, Sparkles, Folder, Paperclip, CheckCircle2, Loader2, Image as ImageIcon } from "lucide-react";
import { Label } from "@/components/ui/label";

const STRATEGY_QUESTIONS = [
  {
    id: "goals",
    title: "Core Business Goals",
    description: "What are your primary business goals and objectives for the next 6-12 months?",
    placeholder: "e.g., Increase MRR by 30%, launch new consulting package..."
  },
  {
    id: "problem",
    title: "The Big Problem",
    description: "What is the biggest challenge your target audience is currently trying to solve?",
    placeholder: "e.g., They are losing hours on manual data entry..."
  },
  {
    id: "audience",
    title: "Ideal Customer",
    description: "Describe the profile of your ideal target customer. What keeps them awake at night?",
    placeholder: "e.g., Agency owners doing $10k/mo who feel burnt out..."
  },
  {
    id: "objections",
    title: "Doubts & Objections",
    description: "What are the most common questions or doubts they have before they buy from you?",
    placeholder: "e.g., 'Is this too technical for me?', 'Do I have the time?'..."
  },
  {
    id: "journey",
    title: "Current Journey & Hook",
    description: "What is the primary reason customers choose you, and what is your initial 'hook' (Lead Magnet)?",
    placeholder: "e.g., We offer a free audit. They choose us for our speed..."
  },
  {
    id: "inaction",
    title: "Cost of Inaction",
    description: "What happens if they don't solve this problem in the next six months?",
    placeholder: "e.g., They will lose market share and continue working 80-hour weeks..."
  },
  {
    id: "success",
    title: "Definition of Success",
    description: "What does a successful outcome for this new funnel look like to you?",
    placeholder: "e.g., 50 new qualified leads per week..."
  }
];

export default function ConsultationPage() {
  const router = useRouter();
  
  // State
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [currentInput, setCurrentInput] = useState("");
  
  // Final Setup State
  const [targetPath, setTargetPath] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [selectedTheme, setSelectedTheme] = useState("Tech-Chic / Studio");
  const [isBuilding, setIsBuilding] = useState(false);

  const isSetupPhase = currentStep === STRATEGY_QUESTIONS.length;

  const handleNext = () => {
    if (!isSetupPhase) {
      const q = STRATEGY_QUESTIONS[currentStep];
      setFormData(prev => ({ ...prev, [q.title]: currentInput }));
      setCurrentInput(formData[STRATEGY_QUESTIONS[currentStep + 1]?.title] || "");
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      const prevQ = STRATEGY_QUESTIONS[currentStep - 1];
      setCurrentInput(formData[prevQ.title] || "");
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleBuild = async () => {
    if (!targetPath) {
      alert("Please provide a target build directory.");
      return;
    }
    
    setIsBuilding(true);

    try {
      const fileData = await Promise.all(
        files.map(async (file) => {
          const buffer = await file.arrayBuffer();
          const base64 = Buffer.from(buffer).toString("base64");
          return { name: file.name, type: file.type, content: base64 };
        })
      );

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetPath,
          files: fileData,
          formData,
          selectedTheme,
        }),
      });

      if (!response.ok) throw new Error("Build Failed.");

      localStorage.setItem("funnelSuccess", JSON.stringify({ path: targetPath }));
      router.push("/success");
    } catch (err) {
      console.error(err);
      alert("An error occurred during the build process.");
      setIsBuilding(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#F9F9F7] p-4 md:p-8 max-w-4xl mx-auto">
      <header className="w-full flex items-center justify-between pb-6 border-b border-border/50 mb-8 mt-4">
        <div className="flex items-center gap-2 text-primary font-bold text-xl tracking-tight">
          <Sparkles className="w-5 h-5" />
          <span>Consultly Studio</span>
        </div>
        
        <div className="flex items-center gap-4">
            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">
                Phase {isSetupPhase ? "2" : "1"} / 2
            </div>
            <div className="px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-bold text-primary uppercase tracking-widest">
                {isSetupPhase ? "Assembly" : "Discovery"}
            </div>
        </div>
      </header>

      <div className="w-full max-w-2xl flex-1 flex flex-col justify-center">
        {!isSetupPhase ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
              <div className="text-primary font-bold tracking-widest uppercase text-xs">
                Question {currentStep + 1} of {STRATEGY_QUESTIONS.length}
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight text-foreground">
                {STRATEGY_QUESTIONS[currentStep].title}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                {STRATEGY_QUESTIONS[currentStep].description}
              </p>
            </div>

            <textarea
              className="w-full min-h-[150px] p-6 rounded-3xl border-2 border-border/50 bg-white text-lg font-medium shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-all resize-none"
              placeholder={STRATEGY_QUESTIONS[currentStep].placeholder}
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              autoFocus
            />

            <div className="flex items-center justify-between pt-4">
              <Button 
                variant="ghost" 
                onClick={handleBack} 
                disabled={currentStep === 0}
                className="rounded-xl h-12 px-6 font-bold"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              
              <Button 
                onClick={handleNext} 
                disabled={!currentInput.trim()}
                className="rounded-xl h-12 px-8 bg-primary text-white hover:bg-primary/90 font-bold shadow-[0_8px_30px_rgb(79,70,229,0.2)]"
              >
                {currentStep === STRATEGY_QUESTIONS.length - 1 ? "Complete Strategy" : "Next Question"} <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
            <div className="text-center space-y-3 mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-primary/10 mb-2 border border-primary/20">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight text-foreground">
                Strategy Mapped.
              </h2>
              <p className="text-muted-foreground font-medium">
                Provide your local delivery path and any brand assets to forge the engine.
              </p>
            </div>

            <Card className="rounded-[2rem] border-border shadow-sm overflow-hidden bg-white">
              <CardContent className="p-8 space-y-6">
                <div className="space-y-3">
                  <Label className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                    <Folder className="w-4 h-4" /> Target Build Directory
                  </Label>
                  <Input
                    value={targetPath}
                    onChange={(e) => setTargetPath(e.target.value)}
                    placeholder="e.g. C:\Users\Desktop\MyFunnel"
                    className="h-16 rounded-2xl border-2 border-border/50 bg-[#F9F9F7]/50 text-base font-medium focus-visible:ring-primary/20 focus-visible:border-primary"
                    disabled={isBuilding}
                  />
                </div>

                <div className="space-y-3 pt-4 border-t border-border/50">
                  <Label className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> Aesthetic Theme
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {["Tech-Chic / Studio", "Cyberpunk / Industrial", "Brutalist / Editorial", "Friendly SaaS / Playful"].map((theme) => (
                      <div 
                        key={theme}
                        onClick={() => !isBuilding && setSelectedTheme(theme)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedTheme === theme ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30 bg-[#F9F9F7]/50'}`}
                      >
                        <div className="font-bold text-sm text-foreground">{theme}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-border/50">
                  <Label className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" /> Brand Assets (Optional)
                  </Label>
                  <div className="relative border-2 border-dashed border-primary/20 rounded-2xl p-8 flex flex-col items-center justify-center hover:border-primary/50 transition-all bg-primary/5 group/upload">
                    <Label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center w-full">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm border border-border group-hover/upload:scale-110 transition-transform mb-3">
                        <Paperclip className="w-6 h-6 text-primary" />
                      </div>
                      <span className="font-bold text-primary text-sm">Inject Brand Assets</span>
                      <span className="text-xs text-muted-foreground mt-1">Logo, product shots, background images</span>
                    </Label>
                    <Input
                      id="file-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={isBuilding}
                    />
                  </div>
                  
                  {files.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 mt-4">
                      {files.map((file, i) => (
                        <div key={i} className="aspect-square rounded-lg bg-white border border-border flex items-center justify-center overflow-hidden relative group">
                          <ImageIcon className="w-4 h-4 text-muted-foreground/40" />
                          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      ))}
                    </div>
                  )}
                  {files.length > 0 && (
                    <div className="text-[10px] font-black uppercase tracking-widest text-primary text-center mt-2">
                      {files.length} Assets Staged for Injection
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-between pt-4">
              <Button 
                variant="ghost" 
                onClick={() => setCurrentStep(STRATEGY_QUESTIONS.length - 1)} 
                disabled={isBuilding}
                className="rounded-xl h-12 px-6 font-bold"
              >
                <ArrowLeft className="w-4 h-4 mr-2" /> Review Strategy
              </Button>
              
              <Button 
                onClick={handleBuild}
                disabled={isBuilding || !targetPath.trim()}
                className="rounded-xl h-14 px-8 bg-primary text-white hover:bg-primary/90 font-bold text-lg shadow-[0_8px_30px_rgb(79,70,229,0.3)] transition-all"
              >
                {isBuilding ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Forging...</>
                ) : (
                  <>Assemble Funnel <Sparkles className="w-5 h-5 ml-2" /></>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
