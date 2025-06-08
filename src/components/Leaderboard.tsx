
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, TrendingUp, Target, Zap } from "lucide-react";

const Leaderboard = () => {
  const topPredictors = [
    {
      rank: 1,
      username: "CryptoProphet",
      truthScore: 94,
      totalVolume: 1247.3,
      predictions: 156,
      winRate: 87.2,
      earnings: 45.6,
      badge: "🏆 Truth Master"
    },
    {
      rank: 2,
      username: "MemeOracle",
      truthScore: 91,
      totalVolume: 983.7,
      predictions: 132,
      winRate: 84.1,
      earnings: 38.2,
      badge: "🔮 Seer"
    },
    {
      rank: 3,
      username: "DegenGuru",
      truthScore: 88,
      totalVolume: 756.2,
      predictions: 98,
      winRate: 81.6,
      earnings: 29.8,
      badge: "⚡ Lightning"
    },
    {
      rank: 4,
      username: "TruthSeeker",
      truthScore: 85,
      totalVolume: 654.1,
      predictions: 87,
      winRate: 79.3,
      earnings: 25.1,
      badge: "🎯 Sharpshooter"
    },
    {
      rank: 5,
      username: "VibeChecker",
      truthScore: 82,
      totalVolume: 543.8,
      predictions: 76,
      winRate: 76.8,
      earnings: 21.7,
      badge: "🌟 Rising Star"
    }
  ];

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return "text-yellow-400";
      case 2: return "text-gray-300";
      case 3: return "text-orange-400";
      default: return "text-purple-300";
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return "🥇";
      case 2: return "🥈";
      case 3: return "🥉";
      default: return rank.toString();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center justify-center">
          <Trophy className="w-6 h-6 mr-2 text-yellow-400" />
          Truth Leaderboard
        </h2>
        <p className="text-purple-300">Top predictors by Truth Score and volume</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-black/40 border-purple-800/30">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-white">2,847</div>
            <div className="text-sm text-purple-300">Total Predictors</div>
          </CardContent>
        </Card>
        <Card className="bg-black/40 border-purple-800/30">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-green-400">15,632 SOL</div>
            <div className="text-sm text-purple-300">Total Volume</div>
          </CardContent>
        </Card>
        <Card className="bg-black/40 border-purple-800/30">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-yellow-400">73.6%</div>
            <div className="text-sm text-purple-300">Avg Accuracy</div>
          </CardContent>
        </Card>
        <Card className="bg-black/40 border-purple-800/30">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-pink-400">1,284</div>
            <div className="text-sm text-purple-300">Active Claims</div>
          </CardContent>
        </Card>
      </div>

      {/* Top Predictors */}
      <Card className="bg-black/40 border-purple-800/30">
        <CardHeader>
          <CardTitle className="text-white">Top Predictors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPredictors.map((predictor) => (
              <div key={predictor.rank} className="flex items-center justify-between p-4 bg-black/30 rounded-lg hover:bg-purple-900/20 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`text-2xl font-bold ${getRankColor(predictor.rank)}`}>
                    {getRankIcon(predictor.rank)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-semibold">{predictor.username}</span>
                      <Badge variant="secondary" className="text-xs">
                        {predictor.badge}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-purple-300">
                      <span>Score: <span className="text-white">{predictor.truthScore}</span></span>
                      <span>Win Rate: <span className="text-green-400">{predictor.winRate}%</span></span>
                      <span>Predictions: <span className="text-white">{predictor.predictions}</span></span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold">{predictor.totalVolume} SOL</div>
                  <div className="text-green-400 text-sm">+{predictor.earnings} SOL earned</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Champions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 border-yellow-600/50">
          <CardHeader className="text-center">
            <CardTitle className="text-yellow-400 flex items-center justify-center">
              <Trophy className="w-5 h-5 mr-2" />
              Volume King
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-xl font-bold text-white">CryptoProphet</div>
            <div className="text-yellow-400">1,247 SOL this week</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-600/50">
          <CardHeader className="text-center">
            <CardTitle className="text-green-400 flex items-center justify-center">
              <Target className="w-5 h-5 mr-2" />
              Accuracy Master
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-xl font-bold text-white">TruthSeeker</div>
            <div className="text-green-400">96.2% accuracy</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-600/50">
          <CardHeader className="text-center">
            <CardTitle className="text-purple-400 flex items-center justify-center">
              <Zap className="w-5 h-5 mr-2" />
              Most Active
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-xl font-bold text-white">MemeOracle</div>
            <div className="text-purple-400">47 predictions</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;
