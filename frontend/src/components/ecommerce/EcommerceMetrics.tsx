"use client";
import { BoxIconLine, GroupIcon } from "@/icons";
import React from "react";
import Badge from "../ui/badge/Badge";

export const EcommerceMetrics = () => {
  const [stats, setStats] = React.useState({
    total_products: 0,
    total_variants: 0,
    active_products: 0,
    low_stock_products: 0,
    total_stock_value: 0
  });

  React.useEffect(() => {
    const fetchStats = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:8000/api/dashboard/stats", {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Accept": "application/json"
                }
            });
            const result = await response.json();
            if (result.status === "success") {
                setStats(result.data);
            }
        } catch (error) {
            console.error(error);
        }
    };
    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <GroupIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Total Products
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {stats.total_products}
            </h4>
          </div>
          <Badge color="success">
            Active: {stats.active_products}
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <BoxIconLine className="text-gray-800 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Low Stock Items
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {stats.low_stock_products}
            </h4>
          </div>

          <Badge color="error">
            Value: ${Number(stats.total_stock_value).toLocaleString()}
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
};
