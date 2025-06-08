
import { Connection, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { WalletContextState } from '@solana/wallet-adapter-react';

// Solana configuration
export const SOLANA_NETWORK = 'devnet';
export const RPC_ENDPOINT = 'https://api.devnet.solana.com';
export const connection = new Connection(RPC_ENDPOINT, 'confirmed');

// Program IDs (replace with actual deployed program IDs)
export const VERIDEX_PROGRAM_ID = new PublicKey('11111111111111111111111111111111'); // Placeholder
export const VERI_TOKEN_MINT = new PublicKey('11111111111111111111111111111111'); // Placeholder

// Instruction types for Anchor program
export interface CreateClaimParams {
  title: string;
  description: string;
  category: string;
  resolutionMethod: 'oracle' | 'timeout' | 'dao';
  deadline: number;
  creatorStake: number;
  isCreatorModerated: boolean;
  requiredVeriStake: number;
}

export interface VoteParams {
  claimId: string;
  side: boolean;
  amount: number;
}

// Solana transaction builders
export const createClaimTransaction = async (
  wallet: WalletContextState,
  params: CreateClaimParams
): Promise<Transaction | null> => {
  if (!wallet.publicKey) return null;

  // This is a placeholder - replace with actual Anchor instruction building
  const transaction = new Transaction();
  
  // Add create_claim instruction
  // const instruction = await program.methods
  //   .createClaim(params)
  //   .accounts({
  //     claim: claimPda,
  //     creator: wallet.publicKey,
  //     systemProgram: SystemProgram.programId,
  //   })
  //   .instruction();
  
  // transaction.add(instruction);
  
  return transaction;
};

export const voteOnClaimTransaction = async (
  wallet: WalletContextState,
  params: VoteParams
): Promise<Transaction | null> => {
  if (!wallet.publicKey) return null;

  const transaction = new Transaction();
  
  // Add vote instruction
  // const instruction = await program.methods
  //   .vote(params.side, new BN(params.amount))
  //   .accounts({
  //     claim: claimPda,
  //     voter: wallet.publicKey,
  //     systemProgram: SystemProgram.programId,
  //   })
  //   .instruction();
  
  // transaction.add(instruction);
  
  return transaction;
};

export const resolveClaimTransaction = async (
  wallet: WalletContextState,
  claimId: string,
  outcome: boolean,
  oracleSignature?: string
): Promise<Transaction | null> => {
  if (!wallet.publicKey) return null;

  const transaction = new Transaction();
  
  // Add resolve instruction with oracle signature
  return transaction;
};
