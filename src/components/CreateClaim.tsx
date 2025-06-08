
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Zap, Lightbulb, Clock } from "lucide-react";

interface CreateClaimProps {
  isWalletConnected: boolean;
}

const CreateClaim = ({ isWalletConnected }: CreateClaimProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    resolution: "",
    deadline: "",
    stake: ""
  });

  const [trendingTopics] = useState([
    "Drake diss track", "SOL price", "Elon tweets", "Doge pump", "NFT comeback"
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isWalletConnected) {
      alert("Please connect your wallet to create a claim!");
      return;
    }
    console.log("Creating claim:", formData);
    // Reset form
    setFormData({
      title: "",
      description: "",
      category: "",
      resolution: "",
      deadline: "",
      stake: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Create Prediction</h2>
        <p className="text-purple-300">Turn your insights into profit. Create viral predictions.</p>
      </div>

      {/* Trending Topics */}
      <Card className="bg-black/40 border-purple-800/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-white text-lg flex items-center">
            <Lightbulb className="w-5 h-5 mr-2 text-yellow-400" />
            Trending Topics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {trendingTopics.map((topic, index) => (
              <Badge 
                key={index}
                variant="secondary"
                className="cursor-pointer hover:bg-purple-600"
                onClick={() => handleInputChange('title', `Will ${topic} happen this week?`)}
              >
                {topic}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Create Form */}
      <Card className="bg-black/40 border-purple-800/30">
        <CardHeader>
          <CardTitle className="text-white">Prediction Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-purple-300">
                Prediction Statement
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Will Drake drop a diss track this week?"
                className="bg-black/50 border-purple-800/50 text-white placeholder:text-purple-400"
                required
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-purple-300">
                Description (Optional)
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Add context, sources, or reasoning..."
                className="bg-black/50 border-purple-800/50 text-white placeholder:text-purple-400"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category" className="text-purple-300">
                  Category
                </Label>
                <Select onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger className="bg-black/50 border-purple-800/50 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="celebrity">Celebrity</SelectItem>
                    <SelectItem value="crypto">Crypto</SelectItem>
                    <SelectItem value="memes">Memes</SelectItem>
                    <SelectItem value="politics">Politics</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="tech">Tech</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="resolution" className="text-purple-300">
                  Resolution Method
                </Label>
                <Select onValueChange={(value) => handleInputChange('resolution', value)}>
                  <SelectTrigger className="bg-black/50 border-purple-800/50 text-white">
                    <SelectValue placeholder="How to resolve?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="oracle">🔮 Oracle (Recommended)</SelectItem>
                    <SelectItem value="timeout">⏱️ Auto Timeout</SelectItem>
                    <SelectItem value="dao">🗳️ DAO Vote (Coming Soon)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="deadline" className="text-purple-300">
                  Deadline
                </Label>
                <Select onValueChange={(value) => handleInputChange('deadline', value)}>
                  <SelectTrigger className="bg-black/50 border-purple-800/50 text-white">
                    <SelectValue placeholder="When to resolve?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1d">1 Day</SelectItem>
                    <SelectItem value="3d">3 Days</SelectItem>
                    <SelectItem value="1w">1 Week</SelectItem>
                    <SelectItem value="2w">2 Weeks</SelectItem>
                    <SelectItem value="1m">1 Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="stake" className="text-purple-300">
                  Creator Stake (Optional)
                </Label>
                <Input
                  id="stake"
                  type="number"
                  step="0.01"
                  value={formData.stake}
                  onChange={(e) => handleInputChange('stake', e.target.value)}
                  placeholder="0.5"
                  className="bg-black/50 border-purple-800/50 text-white placeholder:text-purple-400"
                />
                <p className="text-xs text-purple-400 mt-1">
                  Stake VERI to self-moderate (earn 1% volume)
                </p>
              </div>
            </div>

            <Button
              type="submit"
              disabled={!isWalletConnected || !formData.title || !formData.category || !formData.resolution || !formData.deadline}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              <Zap className="w-4 h-4 mr-2" />
              Create Prediction
            </Button>

            {!isWalletConnected && (
              <p className="text-center text-purple-400 text-sm">
                Connect your wallet to create predictions
              </p>
            )}
          </form>
        </CardContent>
      </Card>

      {/* Creator Benefits */}
      <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-600/50">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-white font-semibold mb-2">Creator Benefits</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-green-400 font-bold">1%</div>
                <div className="text-purple-300">Volume Fee</div>
              </div>
              <div>
                <div className="text-yellow-400 font-bold">Truth Score</div>
                <div className="text-purple-300">Reputation</div>
              </div>
              <div>
                <div className="text-blue-400 font-bold">Viral Reach</div>
                <div className="text-purple-300">Social Boost</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateClaim;
