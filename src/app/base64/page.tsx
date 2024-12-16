"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Download,
  FileCode,
  Copy,
  ArrowRightLeft,
  FileType,
  Binary,
  ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1 },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Base64Page() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [base64String, setBase64String] = useState<string>("");
  const [mode, setMode] = useState<"toBase64" | "toImage">("toBase64");
  const [metadata, setMetadata] = useState<{
    name?: string;
    size?: string;
    type?: string;
    width?: number;
    height?: number;
    base64Length?: number;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
      setBase64String((reader.result as string).split(",")[1]);

      const img = new Image();
      img.src = reader.result as string;
      img.onload = () => {
        setMetadata({
          name: file.name,
          size: (file.size / 1024).toFixed(2) + " KB",
          type: file.type,
          width: img.width,
          height: img.height,
          base64Length: (reader.result as string).length,
        });
      };
    };
    reader.readAsDataURL(file);
  };

  const handleBase64Input = (value: string) => {
    setBase64String(value);
    try {
      const imageData = `data:image/png;base64,${value}`;
      setSelectedImage(imageData);

      const img = new Image();
      img.src = imageData;
      img.onload = () => {
        setMetadata({
          width: img.width,
          height: img.height,
          base64Length: value.length,
          type: "Decoded Image",
        });
      };
      img.onerror = () => {
        toast.error("Invalid Base64 image string");
        setSelectedImage(null);
        setMetadata(null);
      };
    } catch {
      toast.error("Invalid Base64 string");
      setSelectedImage(null);
      setMetadata(null);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(base64String);
    toast.success("Copied to clipboard!");
  };

  const downloadImage = () => {
    if (!selectedImage) return;
    const link = document.createElement("a");
    link.href = selectedImage;
    link.download = "decoded-image.png";
    link.click();
  };

  const toggleMode = () => {
    setMode(mode === "toBase64" ? "toImage" : "toBase64");
    setSelectedImage(null);
    setBase64String("");
    setMetadata(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container max-w-5xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block p-2 mb-6 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl backdrop-blur-sm">
            <Binary className="w-12 h-12 text-green-400" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-600">
            Base64 Image Converter
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Transform your images into Base64 strings or decode Base64 back to
            images instantly
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-gray-800/50 border-green-500/20 hover:border-green-500/40 transition-colors">
            <FileType className="w-8 h-8 text-green-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Multiple Formats</h3>
            <p className="text-gray-400">
              Support for JPEG, PNG, GIF, and more image formats
            </p>
          </Card>
          <Card className="p-6 bg-gray-800/50 border-green-500/20 hover:border-green-500/40 transition-colors">
            <Binary className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Instant Conversion</h3>
            <p className="text-gray-400">
              Real-time encoding and decoding capabilities
            </p>
          </Card>
          <Card className="p-6 bg-gray-800/50 border-green-500/20 hover:border-green-500/40 transition-colors">
            <ImageIcon className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Image Analysis</h3>
            <p className="text-gray-400">
              View dimensions, size, and format details
            </p>
          </Card>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="flex justify-center">
              <Button
                onClick={toggleMode}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 transition-all duration-300"
              >
                <ArrowRightLeft className="mr-2 h-4 w-4" />
                Switch to{" "}
                {mode === "toBase64" ? "Base64 to Image" : "Image to Base64"}
              </Button>
            </motion.div>

            <motion.div variants={itemVariants}>
              {mode === "toBase64" ? (
                <div className="group">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="border-2 border-dashed border-green-500/30 rounded-xl p-8 text-center cursor-pointer hover:border-green-500/50 transition-all duration-300 bg-gray-800/40 backdrop-blur-sm group-hover:shadow-lg group-hover:shadow-green-500/10"
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
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6"
                      >
                        <motion.img
                          src={selectedImage}
                          alt="Preview"
                          className="max-h-[300px] mx-auto rounded-lg shadow-xl"
                        />
                        {metadata && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-800/60 p-6 rounded-lg"
                          >
                            {Object.entries(metadata).map(([key, value]) => (
                              <div key={key} className="text-center">
                                <p className="text-sm text-gray-400 capitalize">
                                  {key}
                                </p>
                                <p className="font-semibold text-white">
                                  {typeof value === "string" ||
                                  typeof value === "number"
                                    ? value
                                    : JSON.stringify(value)}
                                </p>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </motion.div>
                    ) : (
                      <div className="flex flex-col items-center space-y-4 py-12">
                        <Upload className="w-16 h-16 text-green-500" />
                        <div>
                          <p className="text-2xl font-medium text-white">
                            Drop your image here
                          </p>
                          <p className="text-lg text-gray-400">
                            or click to browse
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
              ) : (
                <Textarea
                  placeholder="Paste your Base64 string here..."
                  className="min-h-[200px] bg-gray-800/60 border-green-500/30 focus:border-green-500/50 transition-all duration-300"
                  value={base64String}
                  onChange={(e) => handleBase64Input(e.target.value)}
                />
              )}
            </motion.div>

            {(selectedImage || base64String) && (
              <motion.div
                variants={itemVariants}
                className="bg-gray-800/60 backdrop-blur-sm border border-green-500/20 rounded-xl p-8 space-y-6 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <FileCode className="w-8 h-8 text-green-500" />
                    <h2 className="text-2xl font-semibold">
                      {mode === "toBase64" ? "Base64 Output" : "Decoded Image"}
                    </h2>
                  </div>
                  <div className="space-x-2">
                    {mode === "toBase64" ? (
                      <Button
                        onClick={copyToClipboard}
                        className="bg-green-500 hover:bg-green-600 text-white"
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy Base64
                      </Button>
                    ) : (
                      <Button
                        onClick={downloadImage}
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download Image
                      </Button>
                    )}
                  </div>
                </div>

                {mode === "toBase64" ? (
                  <Textarea
                    value={base64String}
                    readOnly
                    className="min-h-[200px] bg-gray-700/60 focus:border-green-500/50"
                  />
                ) : (
                  selectedImage && (
                    <motion.img
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      src={selectedImage}
                      alt="Decoded"
                      className="max-h-[300px] mx-auto rounded-lg shadow-xl"
                    />
                  )
                )}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
