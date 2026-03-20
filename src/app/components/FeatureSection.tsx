"use client";

import { useState } from "react";
import { useNamespaceData } from "@/app/hooks/useNamespaceData";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export default function FeatureSection() {
  const { data, isLoading, isError } = useNamespaceData();
  const [hovered, setHovered] = useState<number | null>(null);

  if (isLoading)
    return (
      <div className="p-10 text-gray-500 animate-pulse">Loading data...</div>
    );

  if (isError)
    return <div className="p-10 text-red-400">Error loading data</div>;

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-green-500/10 via-transparent to-green-500/10 blur-3xl" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-6xl mx-auto px-6 py-[clamp(4rem,7vw,9rem)]"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-semibold text-white mb-4 leading-tight">
            Optimize Resource Efficiency <br /> in Real Time
          </h2>
          <p className="text-gray-400 max-w-xl">
            Visualize system performance, identify inefficiencies, and act
            instantly with real-time insights.
          </p>
        </motion.div>

        {/* Glass Panel */}
        <motion.div
          variants={itemVariants}
          className="p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl"
        >
          {/* Bar Chart */}
          <div className="flex items-end gap-6 h-72">
            {data?.map((item: any) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                className="flex flex-col items-center flex-1"
              >
                <motion.div
                  className="w-full rounded-t-xl bg-gradient-to-t from-green-500 to-green-300 shadow-[0_0_25px_rgba(34,197,94,0.4)]"
                  initial={{ height: 0 }}
                  whileInView={{ height: `${item.efficiency * 2}px` }}
                  transition={{ duration: 0.6, ease: "easeOut" as const }}
                  whileHover={{ scale: 1.08 }}
                />

                {/* Hover value */}
                <div className="mt-2 h-4 flex items-center justify-center">
                  {hovered === item.id && (
                    <motion.span
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-green-300"
                    >
                      {item.efficiency}%
                    </motion.span>
                  )}
                </div>

                <p className="mt-2 text-xs text-gray-400 text-center">
                  {item.name}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        >
          {data?.slice(0, 3).map((item: any) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ scale: 1.04 }}
              className="p-6 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:shadow-xl transition"
            >
              <p className="text-sm text-gray-400 mb-2">{item.name}</p>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-2xl font-semibold text-white"
              >
                {item.total}
              </motion.p>

              <p className="text-green-400 text-sm mt-1">
                {item.efficiency}% efficiency
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
