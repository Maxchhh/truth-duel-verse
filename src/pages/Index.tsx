
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { Plus, User, TrendingUp } from "lucide-react";
import WalletConnect from "@/components/WalletConnect";
import ClaimFeed from "@/components/ClaimFeed";
import CreateClaim from "@/components/CreateClaim";
import Leaderboard from "@/components/Leaderboard";
import DuelArena from "@/components/DuelArena";
import ProfileModal from "@/components/ProfileModal";
import AuthModal from "@/components/auth/AuthModal";
import { useAuth } from "@/hooks/useAuth";
import { useSolana } from "@/hooks/useSolana";

const Index = () => {
  const [activeTab, setActiveTab] = useState("feed");
  const [showCreateClaim, setShowCreateClaim] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  
  const { user, profile, loading } = useAuth();
  const { isConnected } = useSolana();

  const handleCreateClaim = () => {
    if (!user) {
      setShowAuth(true);
      return;
    }
    setShowCreateClaim(true);
  };

  const handleShowProfile = () => {
    if (!user) {
      setShowAuth(true);
      return;
    }
    setShowProfile(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading Veridex...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black text-white">
      {/* Header */}
      <header className="border-b border-purple-800/30 backdrop-blur-md bg-black/30 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Veridex
              </h1>
              <div className="hidden md:flex space-x-2">
                <Button
                  variant={activeTab === "feed" ? "default" : "ghost"}
                  onClick={() => setActiveTab("feed")}
                  className="text-sm"
                >
                  Feed
                </Button>
                <Button
                  variant={activeTab === "leaderboard" ? "default" : "ghost"}
                  onClick={() => setActiveTab("leaderboard")}
                  className="text-sm"
                >
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Leaderboard
                </Button>
                <Button
                  variant={activeTab === "duels" ? "default" : "ghost"}
                  onClick={() => setActiveTab("duels")}
                  className="text-sm"
                >
                  Duels
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {user && profile && (
                <div className="hidden md:flex items-center space-x-2 text-sm text-purple-300">
                  <span>Truth Score: {profile.truth_score}</span>
                  <span>•</span>
                  <span>{profile.veri_balance} VERI</span>
                </div>
              )}
              
              <Button
                onClick={handleCreateClaim}
                size="sm"
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                <Plus className="w-4 h-4 mr-1" />
                Create
              </Button>

              <Button
                onClick={handleShowProfile}
                variant="outline"
                size="sm"
                className="border-purple-600 text-purple-300 hover:bg-purple-600"
              >
                <User className="w-4 h-4" />
              </Button>

              <WalletConnect />

              {!user && (
                <Button
                  onClick={() => setShowAuth(true)}
                  variant="outline"
                  size="sm"
                  className="border-purple-600 text-purple-300 hover:bg-purple-600"
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className="md:hidden border-b border-purple-800/30 bg-black/30">
        <div className="flex justify-around py-2">
          <Button
            variant={activeTab === "feed" ? "default" : "ghost"}
            onClick={() => setActiveTab("feed")}
            size="sm"
          >
            Feed
          </Button>
          <Button
            variant={activeTab === "leaderboard" ? "default" : "ghost"}
            onClick={() => setActiveTab("leaderboard")}
            size="sm"
          >
            Leaders
          </Button>
          <Button
            variant={activeTab === "duels" ? "default" : "ghost"}
            onClick={() => setActiveTab("duels")}
            size="sm"
          >
            Duels
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {activeTab === "feed" && <ClaimFeed />}
        {activeTab === "leaderboard" && <Leaderboard />}
        {activeTab === "duels" && <DuelArena />}
      </main>

      {/* Modals */}
      <CreateClaim 
        isOpen={showCreateClaim} 
        onClose={() => setShowCreateClaim(false)} 
      />
      <ProfileModal 
        isOpen={showProfile} 
        onClose={() => setShowProfile(false)} 
      />
      <AuthModal 
        isOpen={showAuth} 
        onClose={() => setShowAuth(false)} 
      />

      <Toaster />
    </div>
  );
};

export default Index;
