
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

interface WalletConnectProps {
  isConnected: boolean;
  onConnect: () => void;
}

const WalletConnect = ({ isConnected, onConnect }: WalletConnectProps) => {
  if (isConnected) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="border-purple-600 text-purple-300 hover:bg-purple-600 hover:text-white"
      >
        <Wallet className="w-4 h-4 mr-2" />
        Connected
      </Button>
    );
  }

  return (
    <Button
      onClick={onConnect}
      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
    >
      <Wallet className="w-4 h-4 mr-2" />
      Connect Wallet
    </Button>
  );
};

export default WalletConnect;
