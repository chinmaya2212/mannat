"use client";

import { useState, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageSquare, Star } from "lucide-react";

interface FeedbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FeedbackModal({ open, onOpenChange }: FeedbackModalProps) {
  const [rating, setRating] = useState<number>(0);
  const [state, handleSubmit, reset] = useForm('xojzzlod');
  
  const [visitorEmail, setVisitorEmail] = useState("");
  const [visitorName, setVisitorName] = useState("");

  useEffect(() => {
    if (open) {
      setVisitorEmail(localStorage.getItem('visitor_email') || "");
      setVisitorName(localStorage.getItem('visitor_name') || "");
    }
  }, [open]);
  
  useEffect(() => {
    if (state.succeeded) {
      const timer = setTimeout(() => {
        onOpenChange(false);
        if (typeof reset === 'function') reset();
        setRating(0);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [state.succeeded, onOpenChange, reset]);

  // Handle manual close
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      if (typeof reset === 'function') reset();
      setRating(0);
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        {state.succeeded ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-4">
            <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-emerald-500" />
            </div>
            <h2 className="text-xl font-semibold">Thank you!</h2>
            <p className="text-muted-foreground text-center">Your feedback helps us build a better platform.</p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Share Your Feedback</DialogTitle>
              <DialogDescription>
                We're constantly improving Mannat.io. Let us know how we're doing or what features you'd like to see next.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              {/* Hidden inputs for rating and user identity */}
              <input type="hidden" name="rating" value={rating} />
              {visitorEmail && <input type="hidden" name="email" value={visitorEmail} />}
              {visitorName && <input type="hidden" name="name" value={visitorName} />}
              
              <div className="space-y-2">
                <label className="text-sm font-medium">How would you rate your experience?</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 transition-colors hover:text-amber-500"
                    >
                      <Star className={`h-6 w-6 ${rating >= star ? "fill-amber-500 text-amber-500" : "text-muted-foreground"}`} />
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">Category</label>
                <select 
                  id="category" 
                  name="category"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="Bug Report">Bug Report</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="General Feedback">General Feedback</option>
                </select>
                <ValidationError prefix="Category" field="category" errors={state.errors} className="text-sm text-destructive" />
              </div>

              <div className="space-y-2">
                <label htmlFor="comments" className="text-sm font-medium">Comments</label>
                <textarea 
                  id="comments" 
                  name="comments"
                  rows={4} 
                  required
                  placeholder="Tell us what you think..."
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <ValidationError prefix="Comments" field="comments" errors={state.errors} className="text-sm text-destructive" />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>Cancel</Button>
                <Button type="submit" disabled={state.submitting}>
                  {state.submitting ? "Submitting..." : "Submit Feedback"}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
