
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Swords, Zap, User, Clock } from "lucide-react";

interface DuelArenaProps {
  isWalletConnected: boolean;
}

const DuelArena = ({ isWalletConnected }: DuelArenaProps) => {
  const [showCreateDuel, setShowCreateDuel] = useState(false);
  const [duelStatement, setDuelStatement] = useState("");
  const [duelStake, setDuelStake] = useState("");

  const activeDuels = [
    {
      id: 1,
      challenger: "CryptoBro42",
      challengerScore: 85,
      opponent: "DegenTrader",
      opponentScore: 92,
      statement: "SOL will outperform ETH this month",
      stake: 5.0,
      deadline: "2d 14h",
      status: "active"
    },
    {
      id: 2,
      challenger: "MemeKing",
      challengerScore: 76,
      opponent: null,
      statement: "Drake will respond to Kendrick within 48h",
      stake: 2.5,
      deadline: "1d 8h",
      status: "open"
    },
    {
      id: 3,
      challenger: "TruthSeeker",
      challengerScore: 88,
      opponent: "VibeChecker",
      opponentScore: 73,
      statement: "DOGE will hit $1 before year end",
      stake: 10.0,
      deadline: "5d 6h",
      status: "active"
    }
  ];

  const handleCreateDuel = () => {
    if (!isWalletConnected) {
      alert("Please connect your wallet to create a duel!");
      return;
    }
    console.log("Creating duel:", { statement: duelStatement, stake: duelStake });
    setDuelStatement("");
    setDuelStake("");
    setShowCreateDuel(false);
  };

  const handleAcceptDuel = (duelId: number) => {
    if (!isWalletConnected) {
      alert("Please connect your wallet to accept a duel!");
      return;
    }
    console.log("Accepting duel:", duelId);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center">
          <Swords className="w-6 h-6 mr-2 text-red-400" />
          Duel Arena
        </h2>
        <p className="text-purple-300">Challenge other predictors to 1v1 truth battles</p>
      </div>

      {/* Create Duel Button */}
      <div className="text-center">
        <Button
          onClick={() => setShowCreateDuel(!showCreateDuel)}
          className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white"
          disabled={!isWalletConnected}
        >
          <Swords className="w-4 h-4 mr-2" />
          Create New Duel
        </Button>
      </div>

      {/* Create Duel Form */}
      {showCreateDuel && (
        <Card className="bg-black/40 border-red-800/30">
          <CardHeader>
            <CardTitle className="text-white">Create a Duel Challenge</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input
                value={duelStatement}
                onChange={(e) => setDuelStatement(e.target.value)}
                placeholder="Make a bold statement to challenge others..."
                className="bg-black/50 border-red-800/50 text-white placeholder:text-red-400"
              />
            </div>
            <div>
              <Input
                type="number"
                step="0.1"
                value={duelStake}
                onChange={(e) => setDuelStake(e.target.value)}
                placeholder="Stake amount (SOL)"
                className="bg-black/50 border-red-800/50 text-white placeholder:text-red-400"
              />
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={handleCreateDuel}
                disabled={!duelStatement || !duelStake}
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                <Zap className="w-4 h-4 mr-2" />
                Issue Challenge
              </Button>
              <Button
                onClick={() => setShowCreateDuel(false)}
                variant="outline"
                className="border-red-600 text-red-400"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Duels */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Active Duels</h3>
        {activeDuels.map((duel) => (
          <Card key={duel.id} className="bg-black/40 border-red-800/30 hover:border-red-600/50 transition-all">
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Statement */}
                <div className="text-center">
                  <h4 className="text-white font-semibold text-lg">"{duel.statement}"</h4>
                  <div className="flex items-center justify-center space-x-4 mt-2 text-sm">
                    <Badge className="bg-red-600">
                      {duel.stake} SOL
                    </Badge>
                    <div className="flex items-center text-yellow-400">
                      <Clock className="w-3 h-3 mr-1" />
                      {duel.deadline}
                    </div>
                  </div>
                </div>

                {/* Participants */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-purple-300" />
                    <span className="text-white font-semibold">{duel.challenger}</span>
                    <Badge variant="secondary" className="text-xs">
                      {duel.challengerScore}
                    </Badge>
                    <span className="text-green-400 text-sm">TRUE</span>
                  </div>

                  <div className="text-red-400 text-xl">
                    ⚔️
                  </div>

                  <div className="flex items-center space-x-2">
                    {duel.opponent ? (
                      <>
                        <span className="text-red-400 text-sm">FALSE</span>
                        <Badge variant="secondary" className="text-xs">
                          {duel.opponentScore}
                        </Badge>
                        <span className="text-white font-semibold">{duel.opponent}</span>
                        <User className="w-4 h-4 text-purple-300" />
                      </>
                    ) : (
                      <Button
                        onClick={() => handleAcceptDuel(duel.id)}
                        size="sm"
                        className="bg-red-600 hover:bg-red-700 text-white"
                        disabled={!isWalletConnected}
                      >
                        Accept Challenge
                      </Button>
                    )}
                  </div>
                </div>

                {/* Status */}
                <div className="text-center">
                  {duel.status === 'open' ? (
                    <Badge variant="outline" className="border-yellow-400 text-yellow-400">
                      🔥 Open Challenge
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-red-400 text-red-400">
                      ⚡ Battle Active
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Duel Rules */}
      <Card className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border-red-600/30">
        <CardHeader>
          <CardTitle className="text-white text-lg">⚔️ Duel Rules</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-purple-300">
          <p>• Both players stake equal SOL amounts</p>
          <p>• Winner takes 95% of the pot (5% to platform)</p>
          <p>• Resolved by oracle or timeout</p>
          <p>• Both gain/lose Truth Score based on outcome</p>
          <p>• Agreement before deadline = small reward for both</p>
        </CardContent>
      </Card>

      {!isWalletConnected && (
        <div className="text-center py-8">
          <p className="text-purple-400">Connect your wallet to participate in duels</p>
        </div>
      )}
    </div>
  );
};

export default DuelArena;
