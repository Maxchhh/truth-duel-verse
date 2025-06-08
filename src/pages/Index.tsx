
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import ClaimFeed from "@/components/ClaimFeed";
import CreateClaim from "@/components/CreateClaim";
import ProfileModal from "@/components/ProfileModal";
import Leaderboard from "@/components/Leaderboard";
import DuelArena from "@/components/DuelArena";
import WalletConnect from "@/components/WalletConnect";
import { Wallet, TrendingUp, Users, Zap } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("feed");
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [userStats, setUserStats] = useState({
    truthScore: 73,
    totalVolume: 12.5,
    predictions: 47,
    winRate: 68.1
  });

  const handleConnectWallet = () => {
    setIsWalletConnected(true);
    console.log("Wallet connected to Veridex!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="border-b border-purple-800/30 bg-black/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Veridex
                </h1>
                <p className="text-xs text-purple-300">Pump.fun for Truth</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {isWalletConnected && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowProfile(true)}
                  className="text-purple-300 hover:text-white hover:bg-purple-800/30"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Truth Score: {userStats.truthScore}
                </Button>
              )}
              <WalletConnect 
                isConnected={isWalletConnected}
                onConnect={handleConnectWallet}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      {isWalletConnected && (
        <div className="bg-black/30 border-b border-purple-800/30">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-6">
                <div className="text-purple-300">
                  Volume: <span className="text-white font-semibold">{userStats.totalVolume} SOL</span>
                </div>
                <div className="text-purple-300">
                  Predictions: <span className="text-white font-semibold">{userStats.predictions}</span>
                </div>
                <div className="text-purple-300">
                  Win Rate: <span className="text-green-400 font-semibold">{userStats.winRate}%</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-semibold">+2.3 SOL today</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-black/30 border border-purple-800/30">
            <TabsTrigger value="feed" className="data-[state=active]:bg-purple-600">
              Feed
            </TabsTrigger>
            <TabsTrigger value="create" className="data-[state=active]:bg-purple-600">
              Create
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="data-[state=active]:bg-purple-600">
              Leaderboard
            </TabsTrigger>
            <TabsTrigger value="duels" className="data-[state=active]:bg-purple-600">
              Duels
            </TabsTrigger>
            <TabsTrigger value="profile" className="data-[state=active]:bg-purple-600">
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="mt-6">
            <ClaimFeed isWalletConnected={isWalletConnected} />
          </TabsContent>

          <TabsContent value="create" className="mt-6">
            <CreateClaim isWalletConnected={isWalletConnected} />
          </TabsContent>

          <TabsContent value="leaderboard" className="mt-6">
            <Leaderboard />
          </TabsContent>

          <TabsContent value="duels" className="mt-6">
            <DuelArena isWalletConnected={isWalletConnected} />
          </TabsContent>

          <TabsContent value="profile" className="mt-6">
            <div className="text-center py-12">
              <p className="text-purple-300 mb-4">Your profile details</p>
              <Button
                onClick={() => setShowProfile(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                View Full Profile
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Profile Modal */}
      {showProfile && (
        <ProfileModal
          isOpen={showProfile}
          onClose={() => setShowProfile(false)}
          userStats={userStats}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-purple-800/30 bg-black/20 mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-purple-300 text-sm">
            Veridex • Making Truth a Competition • Built on Solana
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
