"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, ValidationError } from "@formspree/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FeedbackModal } from "@/components/FeedbackModal";
import { 
  Database, 
  GitBranch, 
  ShieldCheck, 
  Bot, 
  ArrowRight,
  MessageSquare
} from "lucide-react";
import { Footer } from "@/components/layout/Footer";

export default function LandingPage() {
  const router = useRouter();
  const [showFeedback, setShowFeedback] = useState(false);
  
  // Initialize Formspree hook
  const [state, handleSubmit] = useForm('mjgddodd');

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const name = formData.get('name');
    if (email) localStorage.setItem('visitor_email', email.toString());
    if (name) localStorage.setItem('visitor_name', name.toString());
    
    await handleSubmit(e);
  };

  // Redirect to dashboard on successful form submission
  useEffect(() => {
    if (state.succeeded) {
      router.push("/dashboard");
    }
  }, [state.succeeded, router]);

  return (
    <div className="flex-1 bg-background text-foreground flex flex-col relative overflow-x-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes sphere-pulse {
          0%, 100% { transform: scale(0.8) translate(-50%, -50%); opacity: 0.4; }
          50% { transform: scale(1.1) translate(-50%, -50%); opacity: 0.8; }
        }
        @keyframes sphere-rotate {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-sphere-pulse {
          animation: sphere-pulse 10s ease-in-out infinite;
          transform-origin: top left;
        }
        .animate-sphere-rotate {
          animation: sphere-rotate 20s linear infinite;
          transform-origin: top left;
        }
      `}</style>

      {/* Background Graphics */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
        {/* Dotted Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-60" />
        
        {/* Glows */}
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute top-[40%] -right-[10%] w-[50%] h-[70%] rounded-full bg-emerald-500/10 blur-[120px]" />

        {/* The Moving Sphere */}
        <div className="absolute top-[40%] left-[30%] w-[500px] h-[500px] pointer-events-none">
          {/* Outer Aura */}
          <div className="absolute top-1/2 left-1/2 w-full h-full rounded-full bg-gradient-to-tr from-emerald-500/10 via-primary/20 to-cyan-500/10 blur-3xl animate-sphere-pulse" />
          
          {/* Swirling Core */}
          <div className="absolute top-1/2 left-1/2 w-[70%] h-[70%] rounded-full bg-gradient-to-br from-primary/30 to-transparent blur-2xl animate-sphere-rotate mix-blend-screen" />
          
          {/* Inner Birth Star */}
          <div className="absolute top-1/2 left-1/2 w-[30%] h-[30%] rounded-full bg-primary/40 blur-xl animate-sphere-pulse" style={{ animationDuration: '4s' }} />
        </div>
      </div>

      {/* Navbar */}
      <nav className="w-full flex items-center justify-between p-6 z-10">
        <div className="flex items-center">
          <span className="text-2xl font-bold tracking-tight">mannat.io</span>
        </div>
        <Button variant="outline" onClick={() => setShowFeedback(true)} className="gap-2 bg-background/50 backdrop-blur-md border-primary/20 hover:bg-primary/10">
          <MessageSquare className="w-4 h-4" />
          Give Feedback
        </Button>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row items-center justify-center p-6 lg:py-12 lg:px-24 z-10 gap-8 lg:gap-16 max-w-[1400px] mx-auto w-full">
        
        {/* Left: Hero Text & Widgets */}
        <div className="flex-1 space-y-6 text-center lg:text-left relative w-full">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/30 shadow-[0_0_15px_rgba(var(--primary),0.2)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Next-Gen Data Governance
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] relative z-10">
            Unify Your <br className="hidden lg:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-cyan-400 drop-shadow-sm">
              Data Ecosystem
            </span>
          </h1>
          
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Mannat.io provides a single pane of glass for data engineers to monitor lineage, validate quality, analyze impact, and seamlessly collaborate with AI agents.
          </p>
        </div>

        {/* Right: Visiting Form */}
        <div className="w-full lg:w-[440px] bg-card/80 backdrop-blur-2xl border border-border/50 rounded-2xl p-6 lg:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative z-20">
          <div className="absolute -top-4 -right-4 h-32 w-32 bg-gradient-to-br from-primary to-emerald-500 rounded-full blur-2xl opacity-40 -z-10 animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="absolute -bottom-4 -left-4 h-32 w-32 bg-gradient-to-tr from-cyan-500 to-primary rounded-full blur-2xl opacity-30 -z-10 animate-pulse" style={{ animationDuration: '8s' }} />
          
          <div className="mb-6">
            <h2 className="text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-muted-foreground">Enter Platform</h2>
            <p className="text-muted-foreground text-xs lg:text-sm mt-1 font-medium">Register as a visitor to access the live dashboard telemetry.</p>
          </div>

          <form onSubmit={onFormSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-[10px] lg:text-xs font-bold uppercase tracking-wider text-muted-foreground">Full Name</label>
              <Input 
                id="name"
                name="name"
                required 
                placeholder="John Doe" 
                className="h-10 lg:h-11 bg-background/50 border-border/50 focus-visible:ring-primary/50 text-sm"
              />
              <ValidationError prefix="Name" field="name" errors={state.errors} className="text-xs text-destructive" />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-[10px] lg:text-xs font-bold uppercase tracking-wider text-muted-foreground">Work Email</label>
              <Input 
                id="email"
                name="email"
                required 
                type="email" 
                placeholder="john@company.com" 
                className="h-10 lg:h-11 bg-background/50 border-border/50 focus-visible:ring-primary/50 text-sm"
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} className="text-xs text-destructive" />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="company" className="text-[10px] lg:text-xs font-bold uppercase tracking-wider text-muted-foreground">Company</label>
              <Input 
                id="company"
                name="company"
                required 
                placeholder="Acme Corp" 
                className="h-10 lg:h-11 bg-background/50 border-border/50 focus-visible:ring-primary/50 text-sm"
              />
              <ValidationError prefix="Company" field="company" errors={state.errors} className="text-xs text-destructive" />
            </div>
            
            <Button type="submit" disabled={state.submitting} className="w-full mt-6 h-12 text-base font-semibold gap-2 shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary),0.5)] transition-all">
              {state.submitting ? "Initializing..." : "Access Telemetry"}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Button>
          </form>
        </div>
      </main>

      <Footer />

      <FeedbackModal open={showFeedback} onOpenChange={setShowFeedback} />
    </div>
  );
}
