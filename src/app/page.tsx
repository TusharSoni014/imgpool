"use client";

import { FeatureCard } from "@/components/Home/FeatureCard";
import { motion } from "framer-motion";
import {
  ImageIcon,
  ScaleIcon,
  CropIcon,
  FilterIcon,
  LightbulbIcon,
  DatabaseIcon,
  PaletteIcon,
  UploadIcon,
  FileSignature,
  Layers,
  Type,
  Eraser,
} from "lucide-react";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

export default function ImgPoolLanding() {
  const features = [
    {
      icon: ImageIcon,
      title: "Universal Converter",
      description:
        "Convert between any image formats seamlessly. JPEG, PNG, WebP, and more!",
      color: "text-green-400",
      link: "/convert",
    },
    {
      icon: ScaleIcon,
      title: "AI Image Upscale",
      description:
        "Enhance image resolution with advanced AI-powered upscaling technology.",
      color: "text-purple-400",
      link: "/upscale",
    },
    {
      icon: DatabaseIcon,
      title: "Base64 Conversion",
      description:
        "Easily convert images to Base64 and back. Perfect for web developers!",
      color: "text-yellow-400",
      link: "/base64",
    },
    {
      icon: LightbulbIcon,
      title: "AI Image Generation",
      description:
        "Transform text prompts to images or extract prompts from existing images.",
      color: "text-red-400",
      link: "/generate",
    },
    {
      icon: CropIcon,
      title: "Precise Cropping",
      description:
        "Advanced cropping tools with real-time preview and aspect ratio locks.",
      color: "text-indigo-400",
      link: "/crop",
    },
    {
      icon: PaletteIcon,
      title: "Color Magic",
      description:
        "Advanced color enhancement and correction with intuitive controls.",
      color: "text-pink-400",
      link: "/color",
    },
    {
      icon: UploadIcon,
      title: "Smart Compression",
      description:
        "Reduce file size with granular quality control and preview.",
      color: "text-teal-400",
      link: "/compress",
    },
    {
      icon: FilterIcon,
      title: "Creative Effects",
      description:
        "Extensive library of professional-grade filters and creative effects.",
      color: "text-orange-400",
      link: "/effects",
    },
    {
      icon: FileSignature,
      title: "Metadata Editor",
      description: "View and edit image metadata with ease.",
      color: "text-blue-400",
      link: "/metadata",
    },
    {
      icon: Layers,
      title: "Image Overlay",
      description: "Combine multiple images with various blending modes.",
      color: "text-amber-400",
      link: "/overlay",
    },
    {
      icon: Type,
      title: "Text on Image",
      description:
        "Add customizable text to your images with various fonts and styles.",
      color: "text-lime-400",
      link: "/text",
    },
    {
      icon: Eraser,
      title: "Background Remover",
      description: "Automatically remove image backgrounds with AI technology.",
      color: "text-cyan-400",
      link: "/remove-bg",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Animated Background Particles */}
      <motion.div
        className="absolute inset-0 z-0 opacity-50 pointer-events-none bg-radial-gradient from-blue-500/20 to-transparent"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.3, 0.5, 0.3],
          transition: { duration: 3, repeat: Infinity },
        }}
      >
        <div className="absolute w-72 h-72 bg-blue-500/20 rounded-full blur-3xl top-12 left-12 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl bottom-12 right-12 animate-pulse"></div>
      </motion.div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }} // Reduced from 0.8
        className="relative z-10 container mx-auto px-6 pt-24 pb-16 text-center"
      >
        <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-radial-gradient from-blue-500/20 to-transparent blur-3xl" />

        <motion.h1
          className="text-6xl md:text-8xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }} // Reduced from 0.6
        >
          ImgPool
        </motion.h1>
        <p className="text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
          Transform your images instantly with our powerful Image tools.
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 font-semibold"
          >
            <span className="inline-block animate-pulse">✨</span> No sign-up
            required. 100% free.
          </motion.span>
        </p>

        <motion.div className="flex justify-center space-x-4">
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.getElementById("features")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            className="group bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-bold hover:bg-blue-700 transition-all duration-300 flex items-center"
          >
            Get Started
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="ml-2"
            >
              ↓
            </motion.span>
          </motion.button>

          <Link href="/docs">
            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 0.15)",
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-glass text-white px-8 py-3 rounded-full text-lg font-bold transition-all duration-300 flex items-center"
            >
              API Docs
              <span className="ml-2">→</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Creator Attribution */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-8 text-gray-400 text-sm"
        >
          Created by{" "}
          <Link
            href="https://tusharsoni.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Tushar Soni
          </Link>
        </motion.div>
      </motion.header>

      <motion.section className="relative z-10 container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "1M+", label: "Images Processed" },
            { number: "50K+", label: "Daily Users" },
            { number: "100%", label: "Free Forever" },
            { number: "12+", label: "Pro Tools" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <h3 className="text-4xl font-bold text-blue-400">
                {stat.number}
              </h3>
              <p className="text-gray-400 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Features Grid */}
      <motion.section
        id="features"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 container mx-auto px-6 py-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">
          Powerful Features, Simplified
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
              link={feature.link}
            />
          ))}
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 container mx-auto px-6 py-24 text-center"
      >
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-16">
          <div className="absolute inset-0 bg-grid-pattern mask-fade-out" />
          <h2 className="text-5xl font-bold text-white mb-8">
            Start Creating
            <br />
            Amazing Images Today
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12">
            Join thousands of creators who trust ImgPool for their image editing
            needs.
          </p>
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100"
            >
              Start Free
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white/10"
            >
              View Documentation
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center py-12 bg-glass"
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-center space-x-6 mb-4">
            <Link
              href="https://github.com/imgpool/imgpool"
              className="text-gray-400 hover:text-white"
            >
              <span className="sr-only">GitHub</span>
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <Link href="/docs" className="text-gray-400 hover:text-white">
              <span className="sr-only">Documentation</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </Link>
          </div>
          <p className="text-gray-400">
            © 2024 ImgPool. Open source and free to use.
          </p>
        </div>
      </motion.footer>
    </div>
  );
}
