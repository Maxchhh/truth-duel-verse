
import { createContext, useContext, useMemo } from 'react';
import { ConnectionProvider, WalletProvider, useWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  BackpackWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { RPC_ENDPOINT } from '@/lib/solana';

// Import wallet adapter CSS
import '@solana/wallet-adapter-react-ui/styles.css';

interface SolanaContextType {
  wallet: ReturnType<typeof useWallet>;
  isConnected: boolean;
  publicKey: string | null;
}

const SolanaContext = createContext<SolanaContextType | undefined>(undefined);

export const useSolana = () => {
  const context = useContext(SolanaContext);
  if (!context) {
    throw new Error('useSolana must be used within a SolanaProvider');
  }
  return context;
};

const SolanaContextProvider = ({ children }: { children: React.ReactNode }) => {
  const wallet = useWallet();
  
  const value = {
    wallet,
    isConnected: wallet.connected,
    publicKey: wallet.publicKey?.toString() || null,
  };

  return (
    <SolanaContext.Provider value={value}>
      {children}
    </SolanaContext.Provider>
  );
};

export const SolanaProvider = ({ children }: { children: React.ReactNode }) => {
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new BackpackWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={RPC_ENDPOINT}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <SolanaContextProvider>
            {children}
          </SolanaContextProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
