import React from "react";

const DashboardHome = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Overview
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: "Total Receipts", value: "1,204", color: "bg-blue-500" },
          { label: "Today's Volume", value: "৳ 85,000", color: "bg-green-500" },
          { label: "Pending Verify", value: "12", color: "bg-orange-500" },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              {stat.label}
            </p>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
              {stat.value}
            </h3>
            <div
              className={`h-1 w-full mt-4 rounded-full ${stat.color} opacity-80`}
            ></div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 p-12 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 text-center">
        <p className="text-gray-500">
          Recent activity chart will appear here...
        </p>
      </div>
    </div>
  );
};

export default DashboardHome;
