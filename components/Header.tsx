"use client";

import { useWallet } from "@/hooks/useWallet";
import { useEffect } from "react";

export function Header() {
  const {
    authenticated,
    login,
    logout,
    address,
    chainId,
    ensureArbitrum,
    usdcBalance,
  } = useWallet();

  useEffect(() => {
    if (authenticated) {
      ensureArbitrum();
    }
  }, [authenticated, ensureArbitrum]);

  return (
    <header className="w-full border-b border-black/10 dark:border-white/15">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="font-semibold text-lg">VaultFlow</div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              Home
            </a>
            <a href="/vaults" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              Vaults
            </a>
            <a href="/profile" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              Profile
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {authenticated ? (
            <>
              <div className="hidden sm:block text-sm">
                {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ""}
              </div>
              <div className="text-sm">
                {usdcBalance ? `${Number(usdcBalance.formatted).toFixed(2)} USDC` : "0.00 USDC"}
              </div>
              <button
                className="rounded-md border px-3 py-1 text-sm hover:bg-black/5 dark:hover:bg-white/10"
                onClick={logout}
              >
                Disconnect
              </button>
            </>
          ) : (
            <button
              className="rounded-md border px-3 py-1 text-sm hover:bg-black/5 dark:hover:bg-white/10"
              onClick={login}
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;


