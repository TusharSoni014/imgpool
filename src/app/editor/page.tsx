"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ImageIcon, Sliders, Type, Edit3 } from "lucide-react";
import { Card } from "@/components/ui/card";
import ImageUploader from "@/components/Editor/ImageUploader";
import ImageEditor from "@/components/Editor/ImageEditor";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ImageEditorPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block p-2 mb-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl backdrop-blur-sm">
            <ImageIcon className="w-12 h-12 text-purple-400" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Advanced Image Editor
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Transform your images with powerful editing tools and creative
            effects
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <Card className="p-6 bg-gray-800/50 border-purple-500/20 hover:border-purple-500/40 transition-colors">
              <Sliders className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Advanced Adjustments
              </h3>
              <p className="text-gray-400">
                Fine-tune color, saturation, vibrance, and sharpness
              </p>
            </Card>
            <Card className="p-6 bg-gray-800/50 border-purple-500/20 hover:border-purple-500/40 transition-colors">
              <Type className="w-8 h-8 text-pink-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Text Overlay</h3>
              <p className="text-gray-400">
                Add customizable text to your images with various fonts and
                styles
              </p>
            </Card>
            <Card className="p-6 bg-gray-800/50 border-purple-500/20 hover:border-purple-500/40 transition-colors">
              <Edit3 className="w-8 h-8 text-indigo-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Creative Tools</h3>
              <p className="text-gray-400">
                Doodle on your images and apply artistic filters
              </p>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            {!selectedImage ? (
              <ImageUploader onImageUpload={handleImageUpload} />
            ) : (
              <ImageEditor image={selectedImage} />
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
