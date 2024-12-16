import { useRef } from "react";
import { motion } from "framer-motion";
import { Upload } from 'lucide-react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

export default function ImageUploader({ onImageUpload }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      onImageUpload(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="border-2 border-dashed border-purple-500/30 rounded-xl p-8 text-center cursor-pointer hover:border-purple-500/50 transition-all duration-300 bg-gray-800/40 backdrop-blur-sm group-hover:shadow-lg group-hover:shadow-purple-500/10"
      onClick={() => fileInputRef.current?.click()}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInput}
        accept="image/*"
        className="hidden"
      />
      <div className="flex flex-col items-center space-y-4 py-12">
        <Upload className="w-16 h-16 text-purple-500" />
        <div>
          <p className="text-2xl font-medium text-white">
            Drop your image here
          </p>
          <p className="text-lg text-gray-400">
            or click to browse
          </p>
        </div>
      </div>
    </motion.div>
  );
}

