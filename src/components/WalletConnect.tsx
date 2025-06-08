
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { useSolana } from '@/hooks/useSolana';

const WalletConnect = () => {
  const { setVisible } = useWalletModal();
  const { isConnected, publicKey, wallet } = useSolana();

  const handleConnect = () => {
    setVisible(true);
  };

  const handleDisconnect = () => {
    wallet.disconnect();
  };

  if (isConnected && publicKey) {
    return (
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="border-purple-600 text-purple-300 hover:bg-purple-600 hover:text-white"
          onClick={handleDisconnect}
        >
          <Wallet className="w-4 h-4 mr-2" />
          {`${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`}
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={handleConnect}
      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
    >
      <Wallet className="w-4 h-4 mr-2" />
      Connect Wallet
    </Button>
  );
};

export default WalletConnect;
