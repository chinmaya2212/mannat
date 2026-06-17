import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-border/50 bg-card/30 backdrop-blur py-8 mt-auto z-10 relative">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground font-medium">
            built by Chinmaya Pradhan
          </p>
        </div>
        
        <div className="flex items-center gap-6">
          <a href="mailto:cpradhan2212@gmail.com" className="text-muted-foreground hover:text-primary flex items-center gap-2 text-sm transition-colors">
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">cpradhan2212@gmail.com</span>
          </a>
          <a href="https://linkedin.com/in/chinmaya-pradhan-221203in" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary flex items-center gap-2 text-sm transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            <span className="hidden sm:inline">LinkedIn</span>
          </a>
          <a href="https://twitter.com/cpradhan2212" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary flex items-center gap-2 text-sm transition-colors">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span className="hidden sm:inline">Twitter</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
