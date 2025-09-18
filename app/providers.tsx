'use client';

import { PrivyProvider as BasePrivyProvider } from '@privy-io/react-auth';
import { WagmiProvider } from '@privy-io/wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http } from 'viem';
import { mainnet, sepolia, arbitrumSepolia, monadTestnet } from 'viem/chains';
import { createConfig } from 'wagmi';

const queryClient = new QueryClient();

// Wagmi configuration for Privy
const config = createConfig({
  chains: [mainnet, sepolia, arbitrumSepolia, monadTestnet],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [arbitrumSepolia.id]: http(),
    [monadTestnet.id]: http(),
  },
});

interface PrivyProviderProps {
  children: React.ReactNode;
}

export function PrivyProvider({ children }: PrivyProviderProps) {
  return (
    <BasePrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
      config={{
        // Customize the login experience
        loginMethods: [ 'wallet'],
        appearance: {
          theme: 'light',
          accentColor: '#19b5bf',
        },
        // Embedded wallet configuration
        embeddedWallets: {
          ethereum: {
            createOnLogin: 'users-without-wallets',
            requireUserPasswordOnCreate: false,
          },
        },
        // Supported chains
        supportedChains: [mainnet, sepolia, arbitrumSepolia, monadTestnet],
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>
          {children}
        </WagmiProvider>
      </QueryClientProvider>
    </BasePrivyProvider>
  );
}