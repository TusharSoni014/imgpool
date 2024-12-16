import { useState, useRef, useEffect } from "react";
import { Sliders, Type, Edit3, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DrawPanel from "./DrawPanel";
import AdjustmentsPanel from "./AdjustmentPanel";
import TextPanel from "./TextPanel";

interface ImageEditorProps {
  image: string;
}

export default function ImageEditor({ image }: ImageEditorProps) {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      const img = new Image();
      img.onload = () => {
        canvasRef.current!.width = img.width;
        canvasRef.current!.height = img.height;
        ctx?.drawImage(img, 0, 0);
        setCanvas(canvasRef.current);
      };
      img.src = image;
    }
  }, [image]);

  // In the Editor component where the save button is located, replace the save button click handler with:

  const handleSave = () => {
    if (!canvasRef.current) return;

    // Convert canvas to blob
    canvasRef.current.toBlob((blob) => {
      if (!blob) return;

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "edited-image.png"; // You can customize the filename

      // Trigger download
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  return (
    <div className="bg-gray-800/60 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8 space-y-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Edit Image</h2>
        <Button
          onClick={handleSave}
          className="bg-purple-500 hover:bg-purple-600 text-white"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <canvas
            ref={canvasRef}
            className="max-w-full h-auto rounded-lg shadow-xl"
          />
        </div>
        <div className="lg:w-1/3">
          <Tabs defaultValue="adjustments" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="adjustments">
                <Sliders className="mr-2 h-4 w-4" />
                Adjust
              </TabsTrigger>
              <TabsTrigger value="text">
                <Type className="mr-2 h-4 w-4" />
                Text
              </TabsTrigger>
              <TabsTrigger value="draw">
                <Edit3 className="mr-2 h-4 w-4" />
                Draw
              </TabsTrigger>
            </TabsList>
            <TabsContent value="adjustments">
              <AdjustmentsPanel canvas={canvas} />
            </TabsContent>
            <TabsContent value="text">
              <TextPanel canvas={canvas} />
            </TabsContent>
            <TabsContent value="draw">
              <DrawPanel canvas={canvas} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
