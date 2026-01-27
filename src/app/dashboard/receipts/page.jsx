"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  Eye,
  MoreHorizontal,
  Loader2,
  FileX,
  Plus,
} from "lucide-react";

export default function AllReceiptsPage() {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // 1. fetch data
  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const res = await fetch("/api/receipts");
        const data = await res.json();
        if (data.success) {
          setReceipts(data.data);
        }
      } catch (error) {
        console.error("Failed to load receipts");
      } finally {
        setLoading(false);
      }
    };

    fetchReceipts();
  }, []);

  // 2. search filter logics
  const filteredReceipts = receipts.filter(
    (item) =>
      item.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.receiptNo.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            All Receipts
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage and track all your issued receipts.
          </p>
        </div>
        <Link
          href="/dashboard/create"
          className="bg-brand-600 hover:bg-brand-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors"
        >
          <Plus size={18} />
          New Receipt
        </Link>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm mb-6">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by Client Name or Receipt No..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        {loading ? (
          // loading skeleton
          <div className="p-12 flex flex-col items-center justify-center text-gray-400">
            <Loader2 className="animate-spin mb-2" size={32} />
            <p>Loading receipts...</p>
          </div>
        ) : filteredReceipts.length === 0 ? (
          // if no data found
          <div className="p-12 flex flex-col items-center justify-center text-gray-400">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-full mb-4">
              <FileX size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              No receipts found
            </h3>
            <p className="text-sm mt-1">
              Try changing your search or create a new one.
            </p>
          </div>
        ) : (
          // Main table
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                    Receipt No
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                    Client Name
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                    Date
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                    Amount
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">
                    Status
                  </th>
                  <th className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredReceipts.map((receipt) => (
                  <tr
                    key={receipt._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono text-xs font-medium text-gray-500 dark:text-gray-400">
                      {receipt.receiptNo}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {receipt.clientName}
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                      {new Date(
                        receipt.date || receipt.createdAt,
                      ).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                      ৳ {receipt.amount}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        Verified
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {/* View Button */}
                      <Link
                        href={`/view/${receipt._id}`} // public view link
                        target="_blank"
                        className="inline-flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-500 transition-colors"
                        title="View Public Page"
                      >
                        <Eye size={18} />
                      </Link>

                      <button className="inline-flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-500 transition-colors ml-1">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
