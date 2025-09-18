import Link from "next/link";
import { vaultGroups } from "@/data/vaults";

export default function VaultsPage() {
  const activeVaults = vaultGroups.filter(vault => vault.status === 'active');
  const comingSoonVaults = vaultGroups.filter(vault => vault.status === 'coming_soon');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Vault Strategies
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Choose from our curated selection of yield optimization strategies
          </p>
        </div>

        {/* Active Vaults */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Active Strategies
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeVaults.map((vault) => (
              <Link
                key={vault.id}
                href={`/vaults/${vault.id}`}
                className="group bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 hover:shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600">
                    {vault.name}
                  </h3>
                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                    Active
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                  {vault.description}
                </p>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-green-600">{vault.apy}%</p>
                      <p className="text-sm text-gray-500">Current APY</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">{vault.tvl}</p>
                      <p className="text-sm text-gray-500">Total Value Locked</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Min Deposit: {vault.minDeposit} USDC
                      </p>
                    </div>
                    <div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        vault.riskLevel === 'low' 
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                          : vault.riskLevel === 'medium'
                          ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                          : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                      }`}>
                        {vault.riskLevel.charAt(0).toUpperCase() + vault.riskLevel.slice(1)} Risk
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex flex-wrap gap-2">
                      {vault.strategies.map((strategy, index) => (
                        <span
                          key={index}
                          className="bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded text-xs"
                        >
                          {strategy}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Coming Soon Vaults */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Coming Soon
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comingSoonVaults.map((vault) => (
              <div
                key={vault.id}
                className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl border border-gray-200 dark:border-gray-600 opacity-75 cursor-not-allowed"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {vault.name}
                  </h3>
                  <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm font-medium">
                    Coming Soon
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
                  {vault.description}
                </p>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-gray-400">TBD</p>
                      <p className="text-sm text-gray-500">Expected APY</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-500">$0</p>
                      <p className="text-sm text-gray-500">Total Value Locked</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        Min Deposit: {vault.minDeposit} USDC
                      </p>
                    </div>
                    <div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        vault.riskLevel === 'low' 
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                          : vault.riskLevel === 'medium'
                          ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                          : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                      }`}>
                        {vault.riskLevel.charAt(0).toUpperCase() + vault.riskLevel.slice(1)} Risk
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex flex-wrap gap-2">
                      {vault.strategies.map((strategy, index) => (
                        <span
                          key={index}
                          className="bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 px-2 py-1 rounded text-xs"
                        >
                          {strategy}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
