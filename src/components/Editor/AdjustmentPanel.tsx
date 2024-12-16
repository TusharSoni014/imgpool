import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import debounce from "lodash/debounce";

interface AdjustmentsPanelProps {
  canvas: HTMLCanvasElement | null;
  onAdjustmentsChange?: (adjustments: typeof initialAdjustments) => void;
}

const initialAdjustments = {
  brightness: 100,
  contrast: 0,
  saturation: 100,
  vibrance: 0,
  sharpness: 0,
};

export default function AdjustmentsPanel({ 
  canvas, 
  onAdjustmentsChange 
}: AdjustmentsPanelProps) {
  const [originalImageData, setOriginalImageData] = useState<ImageData | null>(null);
  const [adjustments, setAdjustments] = useState(initialAdjustments);
  const imageDataRef = useRef<ImageData | null>(null);

  // Capture the original image data when canvas changes
  useEffect(() => {
    if (!canvas) return;

    try {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      setOriginalImageData(imageData);
      imageDataRef.current = imageData;
    } catch (error) {
      console.error('Error capturing original image data:', error);
    }
  }, [canvas]);

  // Advanced image processing with optimized performance
  const applyAdjustments = useCallback(() => {
    if (!canvas || !originalImageData) return;

    try {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Create a copy of the original image data to modify
      const imageData = new ImageData(
        new Uint8ClampedArray(originalImageData.data),
        originalImageData.width,
        originalImageData.height
      );
      const data = imageData.data;

      // Precompute lookup tables for performance
      const brightnessLUT = new Uint8ClampedArray(256);
      const contrastLUT = new Uint8ClampedArray(256);

      const brightnessMultiplier = adjustments.brightness / 100;
      const contrastFactor = (259 * (adjustments.contrast + 255)) / (255 * (259 - adjustments.contrast));

      // Generate lookup tables
      for (let i = 0; i < 256; i++) {
        brightnessLUT[i] = Math.min(255, Math.max(0, i * brightnessMultiplier));
        contrastLUT[i] = Math.min(255, Math.max(0, contrastFactor * (i - 128) + 128));
      }

      // Parallel processing for image adjustment
      for (let i = 0; i < data.length; i += 4) {
        // Brightness and Contrast
        data[i] = contrastLUT[brightnessLUT[data[i]]];
        data[i + 1] = contrastLUT[brightnessLUT[data[i + 1]]];
        data[i + 2] = contrastLUT[brightnessLUT[data[i + 2]]];

        // Saturation
        if (adjustments.saturation !== 100) {
          const r = data[i], g = data[i + 1], b = data[i + 2];
          const gray = 0.2989 * r + 0.587 * g + 0.114 * b;
          const saturationMultiplier = adjustments.saturation / 100;
          
          data[i] = Math.min(255, Math.max(0, gray + (r - gray) * saturationMultiplier));
          data[i + 1] = Math.min(255, Math.max(0, gray + (g - gray) * saturationMultiplier));
          data[i + 2] = Math.min(255, Math.max(0, gray + (b - gray) * saturationMultiplier));
        }

        // Vibrance (more subtle color enhancement)
        if (adjustments.vibrance !== 0) {
          const r = data[i], g = data[i + 1], b = data[i + 2];
          const max = Math.max(r, g, b);
          const avg = (r + g + b) / 3;
          const amt = ((Math.abs(max - avg) * 2) / 255) * (adjustments.vibrance / 100);
          
          data[i] = Math.min(255, Math.max(0, r + (max - r) * amt));
          data[i + 1] = Math.min(255, Math.max(0, g + (max - g) * amt));
          data[i + 2] = Math.min(255, Math.max(0, b + (max - b) * amt));
        }

        // Simple Sharpness (basic implementation)
        if (adjustments.sharpness > 0) {
          const sharpnessFactor = adjustments.sharpness / 100;
          const laplacianKernel = [
            -1, -1, -1,
            -1,  8, -1,
            -1, -1, -1
          ];
          
          // Note: This is a simplified sharpening that could be more sophisticated
          // Actual sharpening would require more complex convolution
          data[i] = Math.min(255, Math.max(0, data[i] + sharpnessFactor * laplacianKernel[4]));
          data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + sharpnessFactor * laplacianKernel[4]));
          data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + sharpnessFactor * laplacianKernel[4]));
        }
      }

      // Apply processed image data
      ctx.putImageData(imageData, 0, 0);

      // Optional callback for parent components
      onAdjustmentsChange?.(adjustments);
    } catch (error) {
      console.error('Error applying image adjustments:', error);
    }
  }, [adjustments, canvas, originalImageData, onAdjustmentsChange]);

  // Debounced adjustment application
  const debouncedApplyAdjustments = useMemo(
    () => debounce(applyAdjustments, 50),
    [applyAdjustments]
  );

  // Update specific adjustment
  const updateAdjustment = useCallback(
    (key: keyof typeof initialAdjustments, value: number) => {
      setAdjustments(prev => ({ ...prev, [key]: value }));
      debouncedApplyAdjustments();
    },
    [debouncedApplyAdjustments]
  );

  // Reset all adjustments
  const handleReset = useCallback(() => {
    setAdjustments(initialAdjustments);
    
    if (canvas && originalImageData) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.putImageData(originalImageData, 0, 0);
      }
    }

    // Optional callback for parent components
    onAdjustmentsChange?.(initialAdjustments);
  }, [canvas, originalImageData, onAdjustmentsChange]);

  return (
    <div className="space-y-6 p-4 bg-gray-800/40 rounded-lg backdrop-blur-sm">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Image Adjustments</h3>
        <Button variant="ghost" size="sm" onClick={handleReset}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      {Object.entries(adjustments).map(([key, value]) => (
        <div key={key} className="space-y-2">
          <Label className="flex justify-between">
            <span className="capitalize">{key}</span>
            <span className="text-gray-400">{value}</span>
          </Label>
          <Slider
            min={key === "vibrance" ? -100 : 0}
            max={key === "vibrance" ? 100 : 200}
            step={1}
            value={[value]}
            onValueChange={([newValue]) => 
              updateAdjustment(key as keyof typeof initialAdjustments, newValue)
            }
            className="my-2"
          />
        </div>
      ))}
    </div>
  );
}