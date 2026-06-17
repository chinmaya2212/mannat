import { ConversationHistory } from "@/features/agents/components/ConversationHistory";
import { ChatInterface } from "@/features/agents/components/ChatInterface";
import { ContextPanel } from "@/features/agents/components/ContextPanel";

export default function AgentWorkspacePage() {
  return (
    <div className="flex h-full w-full overflow-hidden bg-background">
      <ConversationHistory />
      <ChatInterface />
      <ContextPanel />
    </div>
  );
}
