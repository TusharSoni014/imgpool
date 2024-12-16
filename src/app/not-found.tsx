"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HomeIcon, WrenchIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 z-0 opacity-50 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
          transition: { duration: 3, repeat: Infinity },
        }}
      >
        <div className="absolute w-72 h-72 bg-blue-500/20 rounded-full blur-3xl top-12 left-12 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl bottom-12 right-12 animate-pulse"></div>
      </motion.div>

      <div className="relative z-10 text-center px-6">
        <motion.h1
          className="text-8xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          404
        </motion.h1>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-semibold mb-4 text-gray-200">
            Page Not Found
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Looks like this page took an unexpected creative break! Don&apos;t
            worry - our powerful image tools are just a click away.
          </p>

          <div className="flex gap-4 justify-center">
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all duration-300 flex items-center"
              >
                <HomeIcon className="w-5 h-5 mr-2" />
                Home
              </motion.button>
            </Link>

            <Link href="/#features">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-glass text-white px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 flex items-center"
              >
                <WrenchIcon className="w-5 h-5 mr-2" />
                Tools
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
