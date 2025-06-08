
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useSolana } from '@/hooks/useSolana';
import { toast } from '@/hooks/use-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signInWithEmail, signUpWithEmail } = useAuth();
  const { publicKey } = useSolana();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    try {
      if (isSignUp) {
        if (!publicKey) {
          toast({
            title: "Wallet Required",
            description: "Please connect your wallet before signing up",
            variant: "destructive",
          });
          return;
        }
        await signUpWithEmail(email, password, publicKey);
        toast({
          title: "Account Created",
          description: "Welcome to Veridex!",
        });
      } else {
        await signInWithEmail(email, password);
        toast({
          title: "Signed In",
          description: "Welcome back to Veridex!",
        });
      }
      onClose();
    } catch (error: any) {
      toast({
        title: "Authentication Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-black/90 border-purple-800">
        <CardHeader>
          <CardTitle className="text-white text-center">
            {isSignUp ? 'Join Veridex' : 'Sign In to Veridex'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-purple-300">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black/50 border-purple-600 text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-purple-300">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black/50 border-purple-600 text-white"
                required
              />
            </div>
            
            {isSignUp && !publicKey && (
              <div className="text-yellow-400 text-sm">
                ⚠️ Connect your wallet first to create an account
              </div>
            )}

            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={loading || (isSignUp && !publicKey)}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-purple-600 text-purple-300 hover:bg-purple-600"
              >
                Cancel
              </Button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-purple-400 hover:text-purple-300 text-sm"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthModal;
