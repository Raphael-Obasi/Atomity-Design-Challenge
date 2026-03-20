"use client";

import { useNamespaceData } from "@/app/hooks/useNamespaceData";

export default function FeatureSection() {
  const { data, isLoading, isError } = useNamespaceData();

  if (isLoading) return <p className="p-10 text-gray-400">Loading...</p>;
  if (isError) return <p className="p-10 text-red-400">Error loading data</p>;

  return (
    <section className="w-full px-6 py-[clamp(3rem,6vw,8rem)] max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h2 className="text-4xl font-semibold mb-3">Resource Usage Overview</h2>
        <p className="text-gray-400">Last 30 Days · Cluster A</p>
      </div>

      {/* Bar Chart */}
      <div className="flex items-end gap-6 h-72 mb-16">
        {data?.map((item: any) => (
          <div key={item.id} className="flex flex-col items-center flex-1">
            <div
              className="w-full rounded-lg bg-gradient-to-t from-green-600 to-green-400 shadow-lg"
              style={{
                height: `${item.efficiency * 2}px`,
              }}
            />
            <p className="mt-3 text-sm text-gray-300 text-center">
              {item.name}
            </p>
          </div>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data?.map((item: any) => (
          <div
            key={item.id}
            className="p-6 rounded-xl bg-[var(--color-bg-secondary)] border border-white/5 hover:border-white/10 transition"
          >
            <h3 className="font-medium mb-3 text-lg">{item.name}</h3>

            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Total</span>
              <span>{item.total}</span>
            </div>

            <div className="flex justify-between text-sm text-gray-400">
              <span>Efficiency</span>
              <span className="text-green-400">{item.efficiency}%</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
