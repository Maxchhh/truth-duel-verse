
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { User, TrendingUp, Target, Zap, Trophy, Calendar } from "lucide-react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userStats: {
    truthScore: number;
    totalVolume: number;
    predictions: number;
    winRate: number;
  };
}

const ProfileModal = ({ isOpen, onClose, userStats }: ProfileModalProps) => {
  const recentPredictions = [
    {
      id: 1,
      statement: "Will Drake drop a diss this week?",
      prediction: "TRUE",
      outcome: "TRUE",
      stake: 2.5,
      profit: 1.8,
      date: "2 days ago"
    },
    {
      id: 2,
      statement: "SOL to hit $300 before NY?",
      prediction: "FALSE",
      outcome: null,
      stake: 5.0,
      profit: 0,
      date: "5 days ago"
    },
    {
      id: 3,
      statement: "Elon tweets about Doge?",
      prediction: "TRUE",
      outcome: "FALSE",
      stake: 1.0,
      profit: -1.0,
      date: "1 week ago"
    }
  ];

  const achievements = [
    { name: "First Prediction", icon: "🎯", earned: true },
    { name: "Truth Seeker", icon: "🔍", earned: true },
    { name: "Volume Trader", icon: "💰", earned: true },
    { name: "Duel Master", icon: "⚔️", earned: false },
    { name: "Oracle", icon: "🔮", earned: false },
    { name: "Legend", icon: "👑", earned: false }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-black/95 border-purple-800/50 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Your Profile
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-purple-900/30 border-purple-600/50">
              <CardContent className="pt-4 text-center">
                <div className="text-2xl font-bold text-purple-400">{userStats.truthScore}</div>
                <div className="text-xs text-purple-300">Truth Score</div>
                <Progress value={userStats.truthScore} className="mt-2 h-2" />
              </CardContent>
            </Card>
            <Card className="bg-green-900/30 border-green-600/50">
              <CardContent className="pt-4 text-center">
                <div className="text-2xl font-bold text-green-400">{userStats.totalVolume}</div>
                <div className="text-xs text-green-300">Total Volume (SOL)</div>
              </CardContent>
            </Card>
            <Card className="bg-blue-900/30 border-blue-600/50">
              <CardContent className="pt-4 text-center">
                <div className="text-2xl font-bold text-blue-400">{userStats.predictions}</div>
                <div className="text-xs text-blue-300">Predictions</div>
              </CardContent>
            </Card>
            <Card className="bg-yellow-900/30 border-yellow-600/50">
              <CardContent className="pt-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">{userStats.winRate}%</div>
                <div className="text-xs text-yellow-300">Win Rate</div>
              </CardContent>
            </Card>
          </div>

          {/* Achievements */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
              Achievements
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border text-center transition-all ${
                    achievement.earned
                      ? 'bg-yellow-900/30 border-yellow-600/50'
                      : 'bg-gray-900/30 border-gray-600/50 opacity-50'
                  }`}
                >
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="text-xs text-white mt-1">{achievement.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-400" />
              Recent Predictions
            </h3>
            <div className="space-y-3">
              {recentPredictions.map((prediction) => (
                <Card key={prediction.id} className="bg-black/40 border-purple-800/30">
                  <CardContent className="pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-white text-sm">{prediction.statement}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge 
                            className={prediction.prediction === 'TRUE' ? 'bg-green-600' : 'bg-red-600'}
                          >
                            {prediction.prediction}
                          </Badge>
                          {prediction.outcome && (
                            <Badge 
                              variant="outline" 
                              className={prediction.outcome === prediction.prediction ? 'border-green-400 text-green-400' : 'border-red-400 text-red-400'}
                            >
                              {prediction.outcome === prediction.prediction ? '✓ Won' : '✗ Lost'}
                            </Badge>
                          )}
                          <span className="text-xs text-purple-300">{prediction.date}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white text-sm">{prediction.stake} SOL</div>
                        {prediction.profit !== 0 && (
                          <div className={`text-xs ${prediction.profit > 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {prediction.profit > 0 ? '+' : ''}{prediction.profit} SOL
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Zap className="w-4 h-4 mr-2" />
              Challenge Friend
            </Button>
            <Button variant="outline" className="border-purple-600 text-purple-400">
              Share Profile
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
