import Link from "next/link";
import { notFound } from "next/navigation";
import { vaultGroups, vaultDetails } from "@/data/vaults";
import { VaultDetail } from "@/types/vault";

interface VaultPageProps {
  params: {
    id: string;
  };
}

export default function VaultDetailPage({ params }: VaultPageProps) {
  const vault = vaultGroups.find(v => v.id === params.id);
  
  if (!vault) {
    notFound();
  }

  const vaultDetail = vaultDetails[vault.id] as VaultDetail | undefined;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/vaults"
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Vaults
          </Link>
        </div>

        {/* Vault Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 mb-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {vault.name}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {vault.description}
              </p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
              vault.status === 'active' 
                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
            }`}>
              {vault.status === 'active' ? 'Active' : 'Coming Soon'}
            </span>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-green-600">{vault.apy}%</p>
              <p className="text-sm text-gray-500">Current APY</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{vault.tvl}</p>
              <p className="text-sm text-gray-500">Total Value Locked</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{vault.minDeposit} USDC</p>
              <p className="text-sm text-gray-500">Minimum Deposit</p>
            </div>
            <div className="text-center">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                vault.riskLevel === 'low' 
                  ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                  : vault.riskLevel === 'medium'
                  ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                  : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
              }`}>
                {vault.riskLevel.charAt(0).toUpperCase() + vault.riskLevel.slice(1)} Risk
              </span>
              <p className="text-sm text-gray-500 mt-1">Risk Level</p>
            </div>
          </div>
        </div>

        {vault.status === 'active' && vaultDetail && (
          <>
            {/* Performance Metrics */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Performance Metrics
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Daily</span>
                    <span className="font-semibold text-green-600">+{(vaultDetail.performance.daily * 100).toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Weekly</span>
                    <span className="font-semibold text-green-600">+{(vaultDetail.performance.weekly * 100).toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Monthly</span>
                    <span className="font-semibold text-green-600">+{(vaultDetail.performance.monthly * 100).toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Yearly</span>
                    <span className="font-semibold text-green-600">+{(vaultDetail.performance.yearly * 100).toFixed(2)}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Vault Statistics
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Active Users</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{vaultDetail.activeUsers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Total Deposits</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{vaultDetail.totalDeposits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Total Withdrawals</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{vaultDetail.totalWithdrawals}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Last Rebalance</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {new Date(vaultDetail.lastRebalance).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategy Details */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Strategies
                </h3>
                <div className="space-y-3">
                  {vault.strategies.map((strategy, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-gray-700 dark:text-gray-300">{strategy}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Supported Assets
                </h3>
                <div className="flex flex-wrap gap-2">
                  {vaultDetail.assets.map((asset, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm"
                    >
                      {asset}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Fees and Contract Info */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Fee Structure
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Management Fee</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{vaultDetail.fees.management}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Performance Fee</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{vaultDetail.fees.performance}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Contract Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-600 dark:text-gray-300 text-sm">Contract Address</span>
                    <p className="font-mono text-sm text-gray-900 dark:text-white break-all">
                      {vault.contractAddress}
                    </p>
                  </div>
                  {vault.website && (
                    <div>
                      <a
                        href={vault.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        Visit Website →
                      </a>
                    </div>
                  )}
                  {vault.docs && (
                    <div>
                      <a
                        href={vault.docs}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        View Documentation →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Ready to Invest?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Start earning optimized yields with this vault strategy. Your funds will be automatically managed across the best opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                  Deposit USDC
                </button>
                <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors">
                  View Simulation
                </button>
              </div>
            </div>
          </>
        )}

        {vault.status === 'coming_soon' && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-8 text-center">
            <h3 className="text-xl font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
              Coming Soon
            </h3>
            <p className="text-yellow-700 dark:text-yellow-300">
              This vault strategy is currently under development. Stay tuned for updates!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
