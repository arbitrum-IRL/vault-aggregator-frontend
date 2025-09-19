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
              <div className="hidden sm:flex items-center gap-2 rounded-md border border-gray-200 dark:border-gray-700 px-2 py-1 text-xs text-gray-700 dark:text-gray-300">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                <span>{chainId ? `Chain: ${chainId}` : ""}</span>
              </div>
              <div className="hidden sm:block text-sm">
                {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ""}
              </div>
              <div className="text-sm">
                {usdcBalance ? `${Number(usdcBalance.formatted).toFixed(2)} ${usdcBalance.symbol ?? "USDC"}` : "0.00 USDC"}
              </div>
              <button
                className="group relative inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                onClick={logout}
              >
                <svg className="h-4 w-4 text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" y1="12" x2="3" y2="12" />
                </svg>
                Disconnect
              </button>
            </>
          ) : (
            <button
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base font-semibold text-white shadow-sm hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all cursor-pointer"
              onClick={login}
            >
              <span className="relative inline-flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/60 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
              </span>
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;


