import { VaultGroup, VaultDetail } from '@/types/vault';

export const vaultGroups: VaultGroup[] = [
  {
    id: 'euler-silo',
    name: 'Euler & Silo Strategy',
    description: 'Automated yield optimization across Euler and Silo protocols with dynamic rebalancing',
    apy: 12.5,
    tvl: '$2.4M',
    status: 'active',
    logo: '/vaults/euler-silo.png',
    strategies: ['Euler Lending', 'Silo Lending', 'Dynamic Rebalancing'],
    riskLevel: 'medium',
    minDeposit: '100',
    contractAddress: '0x1234567890123456789012345678901234567890',
    website: 'https://euler.finance',
    docs: 'https://docs.euler.finance'
  },
  {
    id: 'aave-compound',
    name: 'Aave & Compound Strategy',
    description: 'Dual protocol lending strategy with automated yield maximization',
    apy: 0,
    tvl: '$0',
    status: 'coming_soon',
    logo: '/vaults/aave-compound.png',
    strategies: ['Aave Lending', 'Compound Lending', 'Yield Optimization'],
    riskLevel: 'low',
    minDeposit: '50'
  },
  {
    id: 'curve-convex',
    name: 'Curve & Convex Strategy',
    description: 'Liquidity provision and staking rewards optimization',
    apy: 0,
    tvl: '$0',
    status: 'coming_soon',
    logo: '/vaults/curve-convex.png',
    strategies: ['Curve LP', 'Convex Staking', 'CRV Rewards'],
    riskLevel: 'high',
    minDeposit: '500'
  },
  {
    id: 'balancer-aura',
    name: 'Balancer & Aura Strategy',
    description: 'Multi-asset pools with boosted rewards through Aura',
    apy: 0,
    tvl: '$0',
    status: 'coming_soon',
    logo: '/vaults/balancer-aura.png',
    strategies: ['Balancer Pools', 'Aura Staking', 'BAL Rewards'],
    riskLevel: 'medium',
    minDeposit: '200'
  },
  {
    id: 'yearn-strategy',
    name: 'Yearn Vault Strategy',
    description: 'Automated yield farming with Yearn vaults',
    apy: 0,
    tvl: '$0',
    status: 'coming_soon',
    logo: '/vaults/yearn.png',
    strategies: ['Yearn Vaults', 'Strategy Optimization', 'Auto-compounding'],
    riskLevel: 'medium',
    minDeposit: '100'
  },
  {
    id: 'beefy-strategy',
    name: 'Beefy Strategy',
    description: 'Multi-chain yield optimization with Beefy Finance',
    apy: 0,
    tvl: '$0',
    status: 'coming_soon',
    logo: '/vaults/beefy.png',
    strategies: ['Beefy Vaults', 'Cross-chain', 'Auto-harvest'],
    riskLevel: 'high',
    minDeposit: '100'
  }
];

export const vaultDetails: Record<string, VaultDetail> = {
  'euler-silo': {
    id: 'euler-silo',
    name: 'Euler & Silo Strategy',
    description: 'Automated yield optimization across Euler and Silo protocols with dynamic rebalancing based on real-time APY data',
    apy: 12.5,
    tvl: '$2.4M',
    status: 'active',
    logo: '/vaults/euler-silo.png',
    strategies: ['Euler Lending', 'Silo Lending', 'Dynamic Rebalancing'],
    riskLevel: 'medium',
    minDeposit: '100',
    contractAddress: '0x1234567890123456789012345678901234567890',
    website: 'https://euler.finance',
    docs: 'https://docs.euler.finance',
    performance: {
      daily: 0.034,
      weekly: 0.24,
      monthly: 1.02,
      yearly: 12.5
    },
    fees: {
      management: 0.5,
      performance: 10
    },
    assets: ['USDC', 'USDT', 'DAI'],
    lastRebalance: '2024-01-15T10:30:00Z',
    nextRebalance: '2024-01-16T10:30:00Z',
    totalDeposits: '$2.4M',
    totalWithdrawals: '$180K',
    activeUsers: 156
  }
};
