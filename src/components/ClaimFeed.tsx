
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, TrendingUp, User, Zap, AlertTriangle } from "lucide-react";
import { getClaims, createVote, subscribeToClaimsUpdates, subscribeToVotesUpdates } from "@/lib/supabase-helpers";
import { useAuth } from "@/hooks/useAuth";
import { useSolana } from "@/hooks/useSolana";
import { voteOnClaimTransaction } from "@/lib/solana";
import { toast } from "@/hooks/use-toast";

const ClaimFeed = () => {
  const [claims, setClaims] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState<string | null>(null);
  
  const { user, profile } = useAuth();
  const { wallet, isConnected } = useSolana();

  useEffect(() => {
    loadClaims();
    
    // Subscribe to real-time updates
    const subscription = subscribeToClaimsUpdates((payload) => {
      console.log('Claims updated:', payload);
      loadClaims(); // Refresh claims on updates
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadClaims = async () => {
    try {
      const data = await getClaims();
      setClaims(data || []);
    } catch (error) {
      console.error('Error loading claims:', error);
      toast({
        title: "Error",
        description: "Failed to load predictions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (claimId: string, side: boolean, amount: number = 0.1) => {
    if (!user || !profile) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to place bets",
        variant: "destructive",
      });
      return;
    }

    if (!isConnected) {
      toast({
        title: "Wallet Required", 
        description: "Please connect your wallet to place bets",
        variant: "destructive",
      });
      return;
    }

    setVoting(claimId);
    
    try {
      // Create Solana transaction
      const transaction = await voteOnClaimTransaction(wallet, {
        claimId,
        side,
        amount,
      });

      if (transaction && wallet.signTransaction) {
        const signedTransaction = await wallet.signTransaction(transaction);
        // In a real implementation, you would send this to the network
        // const signature = await connection.sendRawTransaction(signedTransaction.serialize());
        
        // For now, simulate a successful transaction
        const mockSignature = `mock_${Date.now()}`;
        
        // Record vote in database
        await createVote({
          claim_id: claimId,
          side,
          stake_amount: amount,
          transaction_signature: mockSignature,
        });

        toast({
          title: "Bet Placed!",
          description: `Successfully bet ${amount} SOL on ${side ? 'TRUE' : 'FALSE'}`,
        });

        // Refresh claims to show updated stakes
        loadClaims();
      }
    } catch (error: any) {
      console.error('Voting error:', error);
      toast({
        title: "Transaction Failed",
        description: error.message || "Failed to place bet",
        variant: "destructive",
      });
    } finally {
      setVoting(null);
    }
  };

  const getProgressValue = (claim: any) => {
    if (!claim.total_volume || claim.total_volume === 0) return 50;
    return (claim.true_stake / claim.total_volume) * 100;
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "celebrity": return "bg-pink-600";
      case "crypto": return "bg-green-600"; 
      case "memes": return "bg-yellow-600";
      case "sports": return "bg-blue-600";
      case "politics": return "bg-red-600";
      default: return "bg-purple-600";
    }
  };

  const formatDeadline = (deadline: string) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diff = deadlineDate.getTime() - now.getTime();
    
    if (diff < 0) return "Expired";
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center text-purple-300">
          Loading predictions...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Live Predictions</h2>
        <div className="flex items-center space-x-2 text-purple-300 text-sm">
          <TrendingUp className="w-4 h-4" />
          <span>Sort by: Latest</span>
        </div>
      </div>

      {claims.length === 0 ? (
        <Card className="bg-black/40 border-purple-800/30 text-center py-12">
          <CardContent>
            <AlertTriangle className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Predictions Yet</h3>
            <p className="text-purple-300">Be the first to create a prediction!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {claims.map((claim) => (
            <Card key={claim.id} className="bg-black/40 border-purple-800/30 hover:border-purple-600/50 transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-white text-lg leading-tight mb-2">
                      {claim.title}
                    </CardTitle>
                    {claim.description && (
                      <p className="text-purple-300 text-sm mb-2">{claim.description}</p>
                    )}
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1 text-purple-300">
                        <User className="w-3 h-3" />
                        <span>{claim.creator?.username || 'Anonymous'}</span>
                        {claim.creator?.truth_score && (
                          <Badge variant="secondary" className="text-xs">
                            {claim.creator.truth_score}
                          </Badge>
                        )}
                      </div>
                      <Badge className={`text-xs ${getCategoryColor(claim.category)}`}>
                        {claim.category}
                      </Badge>
                      <div className="flex items-center space-x-1 text-yellow-400">
                        <Clock className="w-3 h-3" />
                        <span>{formatDeadline(claim.deadline)}</span>
                      </div>
                      {claim.is_creator_moderated && (
                        <Badge variant="outline" className="text-xs border-yellow-600 text-yellow-400">
                          Creator Moderated
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold">
                      {Number(claim.total_volume || 0).toFixed(2)} SOL
                    </div>
                    <div className="text-xs text-purple-300">Total Volume</div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Voting Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-400">
                      TRUE ({claim.true_votes || 0} votes)
                    </span>
                    <span className="text-red-400">
                      FALSE ({claim.false_votes || 0} votes)
                    </span>
                  </div>
                  <div className="relative">
                    <Progress 
                      value={getProgressValue(claim)} 
                      className="h-3 bg-red-900"
                    />
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-full"
                      style={{ width: `${getProgressValue(claim)}%` }} 
                    />
                  </div>
                  <div className="flex justify-between text-xs text-purple-300">
                    <span>{Number(claim.true_stake || 0).toFixed(2)} SOL</span>
                    <span>{Number(claim.false_stake || 0).toFixed(2)} SOL</span>
                  </div>
                </div>

                {/* Voting Buttons */}
                {claim.status === 'active' && (
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      onClick={() => handleVote(claim.id, true)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                      disabled={!user || !isConnected || voting === claim.id}
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      {voting === claim.id ? 'Betting...' : 'Bet TRUE'}
                    </Button>
                    <Button 
                      onClick={() => handleVote(claim.id, false)}
                      className="bg-red-600 hover:bg-red-700 text-white"
                      disabled={!user || !isConnected || voting === claim.id}
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      {voting === claim.id ? 'Betting...' : 'Bet FALSE'}
                    </Button>
                  </div>
                )}

                {/* Resolution Method */}
                <div className="text-xs text-purple-300 text-center">
                  Resolution: {claim.resolution_method === 'oracle' ? '🔮 Oracle' : 
                             claim.resolution_method === 'timeout' ? '⏱️ Timeout' : '🗳️ DAO'}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClaimFeed;
