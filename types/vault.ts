export interface VaultGroup {
  id: string;
  name: string;
  description: string;
  apy: number;
  tvl: string;
  status: 'active' | 'coming_soon';
  logo: string;
  strategies: string[];
  riskLevel: 'low' | 'medium' | 'high';
  minDeposit: string;
  maxDeposit?: string;
  contractAddress?: string;
  website?: string;
  docs?: string;
}

export interface VaultDetail extends VaultGroup {
  performance: {
    daily: number;
    weekly: number;
    monthly: number;
    yearly: number;
  };
  fees: {
    management: number;
    performance: number;
  };
  assets: string[];
  lastRebalance: string;
  nextRebalance: string;
  totalDeposits: string;
  totalWithdrawals: string;
  activeUsers: number;
}

export interface UserTransaction {
  id: string;
  type: 'deposit' | 'withdraw';
  amount: string;
  vaultId: string;
  vaultName: string;
  timestamp: string;
  txHash: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface UserProfile {
  address: string;
  totalDeposited: string;
  totalWithdrawn: string;
  activeVaults: string[];
  totalEarnings: string;
  transactions: UserTransaction[];
}
