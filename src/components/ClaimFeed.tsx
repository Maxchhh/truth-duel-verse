
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, TrendingUp, User, Zap } from "lucide-react";

interface ClaimFeedProps {
  isWalletConnected: boolean;
}

const ClaimFeed = ({ isWalletConnected }: ClaimFeedProps) => {
  const [claims] = useState([
    {
      id: 1,
      title: "Will Drake drop a diss track this week?",
      creator: "CryptoBro42",
      creatorScore: 85,
      deadline: "3d 14h",
      totalVolume: 47.3,
      trueStake: 28.1,
      falseStake: 19.2,
      trueVotes: 234,
      falseVotes: 189,
      resolution: "oracle",
      category: "Celebrity"
    },
    {
      id: 2,
      title: "Will SOL hit $300 before New Year?",
      creator: "DegenTrader",
      creatorScore: 92,
      deadline: "15d 6h",
      totalVolume: 156.8,
      trueStake: 89.4,
      falseStake: 67.4,
      trueVotes: 445,
      falseVotes: 332,
      resolution: "oracle",
      category: "Crypto"
    },
    {
      id: 3,
      title: "Will Elon tweet about Doge this week?",
      creator: "MemeKing",
      creatorScore: 76,
      deadline: "6d 12h",
      totalVolume: 23.7,
      trueStake: 15.1,
      falseStake: 8.6,
      trueVotes: 167,
      falseVotes: 98,
      resolution: "timeout",
      category: "Memes"
    }
  ]);

  const handleVote = (claimId: number, side: 'true' | 'false') => {
    if (!isWalletConnected) {
      alert("Please connect your wallet to vote!");
      return;
    }
    console.log(`Voting ${side} on claim ${claimId}`);
  };

  const getProgressValue = (claim: any) => {
    return (claim.trueStake / claim.totalVolume) * 100;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Celebrity": return "bg-pink-600";
      case "Crypto": return "bg-green-600";
      case "Memes": return "bg-yellow-600";
      default: return "bg-purple-600";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Live Predictions</h2>
        <div className="flex items-center space-x-2 text-purple-300 text-sm">
          <TrendingUp className="w-4 h-4" />
          <span>Sort by: Volume</span>
        </div>
      </div>

      <div className="grid gap-4">
        {claims.map((claim) => (
          <Card key={claim.id} className="bg-black/40 border-purple-800/30 hover:border-purple-600/50 transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-white text-lg leading-tight mb-2">
                    {claim.title}
                  </CardTitle>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1 text-purple-300">
                      <User className="w-3 h-3" />
                      <span>{claim.creator}</span>
                      <Badge variant="secondary" className="text-xs">
                        {claim.creatorScore}
                      </Badge>
                    </div>
                    <Badge className={`text-xs ${getCategoryColor(claim.category)}`}>
                      {claim.category}
                    </Badge>
                    <div className="flex items-center space-x-1 text-yellow-400">
                      <Clock className="w-3 h-3" />
                      <span>{claim.deadline}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold">{claim.totalVolume} SOL</div>
                  <div className="text-xs text-purple-300">Total Volume</div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Voting Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-green-400">TRUE ({claim.trueVotes} votes)</span>
                  <span className="text-red-400">FALSE ({claim.falseVotes} votes)</span>
                </div>
                <div className="relative">
                  <Progress 
                    value={getProgressValue(claim)} 
                    className="h-3 bg-red-900"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                       style={{ width: `${getProgressValue(claim)}%` }} />
                </div>
                <div className="flex justify-between text-xs text-purple-300">
                  <span>{claim.trueStake} SOL</span>
                  <span>{claim.falseStake} SOL</span>
                </div>
              </div>

              {/* Voting Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  onClick={() => handleVote(claim.id, 'true')}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  disabled={!isWalletConnected}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Bet TRUE
                </Button>
                <Button 
                  onClick={() => handleVote(claim.id, 'false')}
                  className="bg-red-600 hover:bg-red-700 text-white"
                  disabled={!isWalletConnected}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Bet FALSE
                </Button>
              </div>

              {/* Resolution Method */}
              <div className="text-xs text-purple-300 text-center">
                Resolution: {claim.resolution === 'oracle' ? '🔮 Oracle' : '⏱️ Timeout'}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClaimFeed;
