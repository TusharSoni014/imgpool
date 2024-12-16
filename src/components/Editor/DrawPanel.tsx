import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ColorPicker } from "../ui/color-picker";

interface DrawPanelProps {
  canvas: HTMLCanvasElement | null;
}

export default function DrawPanel({ canvas }: DrawPanelProps) {
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(5);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastX = 0;
    let lastY = 0;

    const draw = (e: MouseEvent) => {
      if (!isDrawing) return;
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();

      [lastX, lastY] = [e.offsetX, e.offsetY];
    };

    canvas.addEventListener("mousedown", (e) => {
      setIsDrawing(true);
      [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", () => setIsDrawing(false));
    canvas.addEventListener("mouseout", () => setIsDrawing(false));

    return () => {
      canvas.removeEventListener("mousedown", () => {});
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", () => {});
      canvas.removeEventListener("mouseout", () => {});
    };
  }, [canvas, color, lineWidth, isDrawing]);

  return (
    <div className="space-y-4">
      <div>
        <Label>Color</Label>
        <ColorPicker color={color} onChange={setColor} />
      </div>
      <div>
        <Label>Line Width</Label>
        <Slider
          min={1}
          max={50}
          step={1}
          value={[lineWidth]}
          onValueChange={([value]) => setLineWidth(value)}
        />
      </div>
    </div>
  );
}
