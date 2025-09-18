"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useAccount, useSwitchChain, useBalance, useChainId } from "wagmi";
import { arbitrum } from "viem/chains";
import { Address } from "viem";

const ARBITRUM_USDC: Address = "0xFF970A61A04b1cA14834A43f5de4533ebDDB5CC8";

export function useWallet() {
  const { login, logout, authenticated, user } = usePrivy();
  const { address, isConnected, status } = useAccount();
  const chainId = useChainId();
  const { switchChainAsync } = useSwitchChain();

  const { data: usdcBalance, refetch: refetchUsdc } = useBalance({
    address,
    token: ARBITRUM_USDC,
    chainId: arbitrum.id,
    query: {
      enabled: Boolean(address),
      refetchOnWindowFocus: false,
    },
  });

  async function ensureArbitrum() {
    if (chainId !== arbitrum.id) {
      try {
        await switchChainAsync({ chainId: arbitrum.id });
      } catch (err) {
        // swallow; user may reject
      }
    }
  }

  return {
    // auth
    authenticated,
    login,
    logout,
    user,
    // wallet
    address,
    isConnected,
    status,
    chainId,
    ensureArbitrum,
    // balances
    usdcBalance,
    refetchUsdc,
    // constants
    arbitrum,
  } as const;
}