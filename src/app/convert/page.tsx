"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Download,
  RefreshCw,
  Info,
  Zap,
  Settings,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const supportedFormats = ["jpeg", "png", "webp", "avif", "tiff", "gif"];

export default function ConvertPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState("png");
  const [quality, setQuality] = useState(80);
  const [loading, setLoading] = useState(false);
  const [metadata, setMetadata] = useState<{
    name: string;
    size: string;
    type: string;
    width: number;
    height: number;
    aspectRatio: string;
    convertedSize?: string;
    originalSize?: string;
  }>({
    name: "",
    size: "",
    type: "",
    width: 0,
    height: 0,
    aspectRatio: "",
    convertedSize: "",
    originalSize: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
      setConvertedImage(null);
      // Create a temporary image to get dimensions
      const img = new Image();
      img.src = reader.result as string;
      img.onload = () => {
        setMetadata({
          name: file.name,
          size: (file.size / 1024).toFixed(2) + " KB",
          type: file.type || "unknown",
          width: img.width,
          height: img.height,
          aspectRatio: (img.width / img.height).toFixed(2),
        });
      };
    };
    reader.readAsDataURL(file);
  };

  const handleConvert = async () => {
    if (!selectedImage) return;

    setLoading(true);
    try {
      const response = await fetch("/api/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetFormat,
          base64Image: selectedImage,
          quality,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setConvertedImage(data.data);
        setMetadata((prevMetadata) => ({
          ...prevMetadata,
          convertedSize: data.metadata.convertedSize,
          originalSize: data.metadata.originalSize,
        }));
      }
    } catch (error) {
      console.error("Conversion failed:", error);
    }
    setLoading(false);
  };

  const handleDownload = () => {
    if (!convertedImage) return;
    const link = document.createElement("a");
    link.href = convertedImage;
    link.download = `converted-image.${targetFormat}`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container max-w-5xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Universal Image Converter
          </h1>
          <p className="text-gray-400 text-xl">
            Professional-grade image conversion with format and quality control
          </p>
        </motion.div>

        <div className="space-y-8">
          {/* Upload Section */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="border-2 border-dashed border-blue-500/30 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500/50 transition-all duration-300 bg-gray-800/40 backdrop-blur-sm shadow-lg"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            {selectedImage ? (
              <div className="space-y-6">
                <motion.img
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  src={selectedImage}
                  alt="Preview"
                  className="max-h-[400px] mx-auto rounded-lg shadow-xl"
                />
                {metadata && !convertedImage && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-800/60 p-6 rounded-lg border border-blue-500/20 backdrop-blur-sm"
                  >
                    <div className="text-center">
                      <p className="text-sm text-gray-400">File Name</p>
                      <p className="font-semibold text-white truncate">
                        {metadata.name}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-400">Size</p>
                      <p className="font-semibold text-white">
                        {metadata.size}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-400">Dimensions</p>
                      <p className="font-semibold text-white">
                        {metadata.width} × {metadata.height}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-400">Type</p>
                      <p className="font-semibold text-white">
                        {(metadata.type &&
                          metadata.type.split("/")[1].toUpperCase()) ||
                          "Unknown"}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-4 py-12">
                <Upload className="w-16 h-16 text-blue-500" />
                <div>
                  <p className="text-2xl font-medium text-white">
                    Drop your image here
                  </p>
                  <p className="text-lg text-gray-400">or click to browse</p>
                </div>
              </div>
            )}
          </motion.div>

          {/* Conversion Controls */}
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800/60 backdrop-blur-sm border border-blue-500/20 rounded-xl p-8 space-y-6 shadow-lg"
            >
              <div className="flex items-center gap-4 mb-6">
                <Settings className="w-8 h-8 text-purple-500" />
                <h2 className="text-2xl font-semibold">Conversion Settings</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Target Format</label>
                  <Select value={targetFormat} onValueChange={setTargetFormat}>
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      {supportedFormats.map((format) => (
                        <SelectItem key={format} value={format}>
                          {format.toUpperCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">
                    Quality: {quality}%
                  </label>
                  <Input
                    type="range"
                    min="1"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="accent-purple-500"
                  />
                </div>
              </div>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={handleConvert}
                      disabled={loading}
                      size="lg"
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                    >
                      {loading ? (
                        <RefreshCw className="mr-2 h-6 w-6 animate-spin" />
                      ) : (
                        <Zap className="mr-2 h-6 w-6" />
                      )}
                      {loading ? "Converting..." : "Convert Image"}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Convert your image to {targetFormat.toUpperCase()} format
                      with {quality}% quality
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </motion.div>
          )}

          {/* Result Section */}
          <AnimatePresence>
            {loading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <Skeleton className="h-[400px] w-full rounded-xl bg-gray-800/60" />
                <Skeleton className="h-24 w-full rounded-xl bg-gray-800/60" />
                <Skeleton className="h-12 w-full rounded-xl bg-gray-800/60" />
              </motion.div>
            ) : (
              convertedImage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-800/60 backdrop-blur-sm border border-blue-500/20 rounded-xl p-8 space-y-6 shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Info className="w-8 h-8 text-green-500" />
                      <h2 className="text-2xl font-semibold">
                        Converted Result
                      </h2>
                    </div>
                    <Button
                      onClick={handleDownload}
                      variant="secondary"
                      className="bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300"
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Download
                    </Button>
                  </div>

                  <motion.img
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    src={convertedImage}
                    alt="Converted"
                    className="rounded-lg w-full object-contain max-h-[400px] shadow-xl"
                  />

                  {metadata && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-700/60 p-6 rounded-lg"
                    >
                      <div>
                        <p className="text-sm text-gray-400">Original Format</p>
                        <p className="font-semibold text-white text-lg">
                          {metadata.type.split("/")[1].toUpperCase()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">New Format</p>
                        <p className="font-semibold text-white text-lg">
                          {targetFormat.toUpperCase()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Original Size</p>
                        <p className="font-semibold text-white text-lg">
                          {metadata.originalSize}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Converted Size</p>
                        <p className="font-semibold text-white text-lg">
                          {metadata.convertedSize}
                        </p>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex justify-center mt-4">
                    <Button
                      onClick={() => {
                        setSelectedImage(null);
                        setConvertedImage(null);
                        setMetadata({
                          name: "",
                          size: "",
                          type: "",
                          width: 0,
                          height: 0,
                          aspectRatio: "",
                          convertedSize: "",
                          originalSize: "",
                        });
                      }}
                      className="mt-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white transition-all duration-300"
                    >
                      <ArrowRight className="mr-2 h-5 w-5" />
                      Convert Another Image
                    </Button>
                  </div>
                </motion.div>
              )
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
