import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, FileText, Award, Send, Heart, Trophy, Map, Users, Archive } from "lucide-react";
interface ProfileSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}
const tabs = [{
  id: "imprints",
  label: "Imprints",
  icon: FileText,
  emoji: "🖋️"
}, {
  id: "badges",
  label: "Badges",
  icon: Award,
  emoji: "🏆"
}, {
  id: "imprints-made",
  label: "Imprints I've Made",
  icon: Send,
  emoji: "📝"
}, {
  id: "imprints-received",
  label: "Imprints That Moved Me",
  icon: Heart,
  emoji: "💝"
}, {
  id: "challenges",
  label: "Challenges",
  icon: Trophy,
  emoji: "🎯"
}, {
  id: "map",
  label: "Memory Map",
  icon: Map,
  emoji: "🧭"
}, {
  id: "referrals",
  label: "Referrals",
  icon: Users,
  emoji: "🤝"
}, {
  id: "vault",
  label: "Legacy Vault",
  icon: Archive,
  emoji: "💎"
}];
const SidebarContent = ({
  activeTab,
  onTabChange
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
}) => <div className="space-y-2 p-4">
    <h3 className="text-lg font-semibold text-foreground mb-4">Profile Sections</h3>
    {tabs.map(tab => {
    const Icon = tab.icon;
    const isActive = activeTab === tab.id;
    return <button key={tab.id} onClick={() => onTabChange(tab.id)} className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group", "hover:bg-white/60 hover:shadow-sm hover:scale-[1.02]", isActive ? "bg-gradient-to-r from-coral-100 to-peach-100 text-coral-700 shadow-md border border-coral-200" : "text-muted-foreground hover:text-foreground")}>
          <span className="text-lg">{tab.emoji}</span>
          
          <span className={cn("font-medium transition-colors text-sm", isActive ? "text-coral-700" : "group-hover:text-foreground")}>
            {tab.label}
          </span>
        </button>;
  })}
  </div>;
export const ProfileSidebar = ({
  activeTab,
  onTabChange,
  className
}: ProfileSidebarProps) => {
  return <>
      {/* Desktop Sidebar */}
      <div className={cn("hidden lg:block w-72 bg-gradient-to-br from-white to-mint-50/30 rounded-2xl shadow-lg border border-white/20 h-fit sticky top-8", className)}>
        <SidebarContent activeTab={activeTab} onTabChange={onTabChange} />
      </div>

      {/* Mobile Sheet */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="mb-6 bg-white/80 hover:bg-white border-white/40 shadow-sm">
              <Menu className="w-4 h-4 mr-2" />
              Profile Menu
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 bg-gradient-to-br from-white to-mint-50/30">
            <SidebarContent activeTab={activeTab} onTabChange={onTabChange} />
          </SheetContent>
        </Sheet>
      </div>
    </>;
};