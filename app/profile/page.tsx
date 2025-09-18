"use client";

import { useWallet } from "@/hooks/useWallet";
import { UserTransaction } from "@/types/vault";
import { useState } from "react";

// Mock transaction data
const mockTransactions: UserTransaction[] = [
  {
    id: "1",
    type: "deposit",
    amount: "1000",
    vaultId: "euler-silo",
    vaultName: "Euler & Silo Strategy",
    timestamp: "2024-01-15T10:30:00Z",
    txHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    status: "completed"
  },
  {
    id: "2",
    type: "deposit",
    amount: "500",
    vaultId: "euler-silo",
    vaultName: "Euler & Silo Strategy",
    timestamp: "2024-01-10T14:20:00Z",
    txHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    status: "completed"
  },
  {
    id: "3",
    type: "withdraw",
    amount: "200",
    vaultId: "euler-silo",
    vaultName: "Euler & Silo Strategy",
    timestamp: "2024-01-05T09:15:00Z",
    txHash: "0x567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234",
    status: "completed"
  }
];

export default function ProfilePage() {
  const { authenticated, address, chainId, usdcBalance } = useWallet();
  const [transactions] = useState<UserTransaction[]>(mockTransactions);

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Please Connect Your Wallet
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            You need to connect your wallet to view your profile.
          </p>
        </div>
      </div>
    );
  }

  const totalDeposited = transactions
    .filter(tx => tx.type === 'deposit' && tx.status === 'completed')
    .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);

  const totalWithdrawn = transactions
    .filter(tx => tx.type === 'withdraw' && tx.status === 'completed')
    .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);

  const currentBalance = totalDeposited - totalWithdrawn;
  const totalEarnings = currentBalance * 0.125; // Assuming 12.5% APY

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Your Profile
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Manage your vault investments and track your performance
          </p>
        </div>

        {/* Wallet Info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Wallet Information
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Wallet Address</p>
              <p className="font-mono text-gray-900 dark:text-white break-all">
                {address}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Network</p>
              <p className="text-gray-900 dark:text-white">
                {chainId === 42161 ? 'Arbitrum One' : `Chain ID: ${chainId}`}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">USDC Balance</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {usdcBalance ? `${Number(usdcBalance.formatted).toFixed(2)} USDC` : '0.00 USDC'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Status</p>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                Connected
              </span>
            </div>
          </div>
        </div>

        {/* Investment Summary */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Deposited</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              ${totalDeposited.toLocaleString()}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Withdrawn</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              ${totalWithdrawn.toLocaleString()}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Current Balance</h3>
            <p className="text-2xl font-bold text-green-600">
              ${currentBalance.toLocaleString()}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Earnings</h3>
            <p className="text-2xl font-bold text-green-600">
              ${totalEarnings.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Active Vaults */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Active Vaults
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Euler & Silo Strategy
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Current APY: 12.5%
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900 dark:text-white">
                  ${currentBalance.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">Invested</p>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Transaction History
          </h2>
          
          {transactions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No transactions yet. Start by depositing into a vault!
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Amount</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Vault</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Transaction</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          transaction.type === 'deposit'
                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                            : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                        }`}>
                          {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">
                        ${parseFloat(transaction.amount).toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                        {transaction.vaultName}
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                        {new Date(transaction.timestamp).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          transaction.status === 'completed'
                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                            : transaction.status === 'pending'
                            ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                            : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                        }`}>
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <a
                          href={`https://arbiscan.io/tx/${transaction.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700 text-sm font-mono"
                        >
                          {transaction.txHash.slice(0, 8)}...{transaction.txHash.slice(-8)}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <a
            href="/vaults"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors"
          >
            Explore Vaults
          </a>
          <a
            href="/"
            className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-6 py-3 rounded-lg font-semibold text-center transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
