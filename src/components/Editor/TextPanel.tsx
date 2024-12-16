import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "../ui/color-picker";

interface TextPanelProps {
  canvas: HTMLCanvasElement | null;
}

export default function TextPanel({ canvas }: TextPanelProps) {
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(24);
  const [color, setColor] = useState("#ffffff");

  const addText = () => {
    if (!canvas || !text) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = color;
    ctx.fillText(text, 50, 50);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Text</Label>
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text"
        />
      </div>
      <div>
        <Label>Font Size</Label>
        <Input
          type="number"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          min={1}
          max={100}
        />
      </div>
      <div>
        <Label>Color</Label>
        <ColorPicker color={color} onChange={setColor} />
      </div>
      <Button onClick={addText} className="w-full">Add Text</Button>
    </div>
  );
}

